#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Database Backup Script for Strapi CMS
 *
 * Supports DATABASE_CLIENT: mysql2 (mysqldump), postgres (pg_dump),
 * better-sqlite3 (file copy after VACUUM). Defaults to mysql2 for backward
 * compatibility with the original script.
 *
 * Security: credentials are never passed on the command line. For mysql2 we
 * write a temporary my.cnf (chmod 0600) and use --defaults-file; for postgres
 * we use PGPASSWORD env var passed to the child only. All commands run via
 * execFile (no shell) to prevent shell injection.
 *
 * Usage:
 *   npm run backup
 *
 * Schedule with cron (Linux/Mac):
 *   0 2 * * * cd /path/to/cms && npm run backup >> /var/log/strapi-backup.log 2>&1
 */

const { execFile } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const os = require('os');

const execFileAsync = promisify(execFile);

require('dotenv').config();

// Configuration
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const MAX_BACKUPS = 7; // Keep only last 7 backups
const DB_CLIENT = (process.env.DATABASE_CLIENT || 'mysql2').toLowerCase();

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
}

// Database credentials from environment - no fallbacks, fail fast if not configured
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbSsl = String(process.env.DATABASE_SSL || '').toLowerCase() === 'true';

// Generate backup filename with timestamp
const timeWithHours = new Date()
  .toISOString()
  .replace(/[:.]/g, '-')
  .split('T')
  .join('_')
  .slice(0, -5); // YYYY-MM-DD_HH-MM-SS

/**
 * Write a temporary my.cnf (chmod 0600) for mysqldump and return its path.
 * The caller is responsible for deleting it (we register a cleanup handler).
 */
function writeMysqlDefaultsFile() {
  const cnfPath = path.join(os.tmpdir(), `skladamy-backup-${process.pid}-${Date.now()}.cnf`);
  const cnfContent = `[client]\nhost=${dbHost}\nport=${dbPort}\nuser=${dbUser}\npassword=${dbPassword}\n`;
  fs.writeFileSync(cnfPath, cnfContent, { encoding: 'utf8', mode: 0o600 });
  return cnfPath;
}

async function backupMysql() {
  const missingVars = [];
  if (!dbHost) missingVars.push('DATABASE_HOST');
  if (!dbPort) missingVars.push('DATABASE_PORT');
  if (!dbName) missingVars.push('DATABASE_NAME');
  if (!dbUser) missingVars.push('DATABASE_USERNAME');
  if (!dbPassword) missingVars.push('DATABASE_PASSWORD');
  if (missingVars.length > 0) {
    console.error('❌ Missing env vars:', missingVars.join(', '));
    process.exit(1);
  }

  const filename = `backup-${timeWithHours}.sql`;
  const backupPath = path.join(BACKUP_DIR, filename);
  const cnfPath = writeMysqlDefaultsFile();

  console.log('🚀 Starting MySQL backup...');
  console.log(`📊 Database: ${dbName} @ ${dbHost}:${dbPort}`);
  console.log(`💾 Backup file: ${filename}`);

  try {
    // execFile (no shell) — args are passed directly to the binary, so no
    // shell injection even if values contain metacharacters. Password is read
    // from the temp my.cnf, never on the command line (not visible in `ps`).
    const args = [`--defaults-file=${cnfPath}`, '--single-transaction', '--quick', '--routines', dbName];
    if (dbSsl) {
      args.push('--ssl-mode=REQUIRED');
    }
    const out = fs.createWriteStream(backupPath);
    try {
      const child = execFile('mysqldump', args, { shell: false, maxBuffer: 1024 * 1024 * 512 });
      child.stdout.pipe(out);
      // Capture stderr for diagnostics without leaking credentials.
      let stderr = '';
      child.stderr.on('data', (d) => {
        stderr += d.toString();
      });
      await child;
      await new Promise((resolve, reject) => {
        out.on('finish', resolve);
        out.on('error', reject);
      });
      if (stderr.trim()) {
        console.error('⚠️  mysqldump stderr:', stderr.trim());
      }
    } finally {
      out.destroy();
    }
    return backupPath;
  } finally {
    // Always remove the credentials file.
    try {
      fs.unlinkSync(cnfPath);
    } catch {
      /* ignore */
    }
  }
}

async function backupPostgres() {
  const missingVars = [];
  if (!dbHost) missingVars.push('DATABASE_HOST');
  if (!dbPort) missingVars.push('DATABASE_PORT');
  if (!dbName) missingVars.push('DATABASE_NAME');
  if (!dbUser) missingVars.push('DATABASE_USERNAME');
  if (!dbPassword) missingVars.push('DATABASE_PASSWORD');
  if (missingVars.length > 0) {
    console.error('❌ Missing env vars:', missingVars.join(', '));
    process.exit(1);
  }

  const filename = `backup-${timeWithHours}.sql`;
  const backupPath = path.join(BACKUP_DIR, filename);

  console.log('🚀 Starting Postgres backup...');
  console.log(`📊 Database: ${dbName} @ ${dbHost}:${dbPort}`);
  console.log(`💾 Backup file: ${filename}`);

  // PGPASSWORD is passed only to the child process env, not the shell.
  const childEnv = { ...process.env, PGPASSWORD: dbPassword };
  const args = [
    `-h`, dbHost,
    `-p`, String(dbPort),
    `-U`, dbUser,
    `-d`, dbName,
    `--no-owner`,
    `--no-privileges`,
    `--format=plain`,
  ];
  if (dbSsl) {
    args.push(`--sslmode=require`);
  }
  const out = fs.createWriteStream(backupPath);
  try {
    const child = execFile('pg_dump', args, { shell: false, env: childEnv, maxBuffer: 1024 * 1024 * 512 });
    child.stdout.pipe(out);
    let stderr = '';
    child.stderr.on('data', (d) => {
      stderr += d.toString();
    });
    await child;
    await new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
    if (stderr.trim()) {
      console.error('⚠️  pg_dump stderr:', stderr.trim());
    }
  } finally {
    out.destroy();
  }
  return backupPath;
}

async function backupSqlite() {
  // better-sqlite3 stores data in a single file. We copy it (after a VACUUM
  // via the sqlite3 CLI if available) to a consistent snapshot.
  const dbFile = process.env.DATABASE_FILENAME || dbName;
  if (!dbFile) {
    console.error('❌ Missing DATABASE_FILENAME/DATABASE_NAME for sqlite backup');
    process.exit(1);
  }
  const resolvedDb = path.isAbsolute(dbFile) ? dbFile : path.join(__dirname, '..', dbFile);
  if (!fs.existsSync(resolvedDb)) {
    console.error(`❌ SQLite file not found: ${resolvedDb}`);
    process.exit(1);
  }

  const filename = `backup-${timeWithHours}.db`;
  const backupPath = path.join(BACKUP_DIR, filename);

  console.log('🚀 Starting SQLite backup...');
  console.log(`📊 Database file: ${resolvedDb}`);
  console.log(`� Backup file: ${filename}`);

  // Prefer sqlite3 CLI VACUUM INTO (atomic snapshot). Fall back to file copy.
  try {
    await execFileAsync('sqlite3', [resolvedDb, `VACUUM INTO '${backupPath.replace(/'/g, "''")}'`], {
      shell: false,
      maxBuffer: 1024 * 1024 * 512,
    });
  } catch (err) {
    console.warn('⚠️  sqlite3 CLI unavailable/failed, falling back to file copy:', err.message);
    fs.copyFileSync(resolvedDb, backupPath);
  }
  return backupPath;
}

async function cleanupOldBackups(extension) {
  console.log(`🧹 Cleaning up old backups (keeping last ${MAX_BACKUPS})...`);
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((file) => file.startsWith('backup-') && file.endsWith(extension))
    .map((file) => ({
      name: file,
      path: path.join(BACKUP_DIR, file),
      time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time); // Sort by newest first

  const backupsToDelete = files.slice(MAX_BACKUPS);
  backupsToDelete.forEach((file) => {
    fs.unlinkSync(file.path);
    console.log(`🗑️  Deleted old backup: ${file.name}`);
  });

  if (backupsToDelete.length === 0) {
    console.log('✨ No old backups to delete');
  }
  console.log(`\n📚 Total backups retained: ${Math.min(files.length, MAX_BACKUPS)}`);
}

async function main() {
  let backupPath;
  let extension;
  try {
    if (DB_CLIENT === 'postgres' || DB_CLIENT === 'pg') {
      backupPath = await backupPostgres();
      extension = '.sql';
    } else if (DB_CLIENT === 'better-sqlite3' || DB_CLIENT === 'sqlite3') {
      backupPath = await backupSqlite();
      extension = '.db';
    } else {
      // default: mysql2 (also handles legacy "mysql")
      backupPath = await backupMysql();
      extension = '.sql';
    }

    // Verify backup file
    const stats = fs.statSync(backupPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    if (stats.size === 0) {
      console.error('❌ Backup file is empty!');
      fs.unlinkSync(backupPath);
      process.exit(1);
    }
    console.log(`✅ Backup created successfully! (${fileSizeMB} MB)`);
    console.log(`📍 Location: ${backupPath}\n`);

    await cleanupOldBackups(extension);
    console.log('✅ Backup process completed successfully!');
  } catch (err) {
    console.error('❌ Backup failed:', err.message);
    if (backupPath && fs.existsSync(backupPath)) {
      try {
        fs.unlinkSync(backupPath);
      } catch {
        /* ignore */
      }
    }
    process.exit(1);
  }
}

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n⚠️  Backup interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Backup terminated');
  process.exit(1);
});

main();
