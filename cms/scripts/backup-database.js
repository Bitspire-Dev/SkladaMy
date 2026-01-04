#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * Database Backup Script for Strapi CMS
 * 
 * Automatically creates MySQL database backups and maintains only the last 7 backups.
 * 
 * Usage:
 *   npm run backup
 * 
 * Schedule with cron (Linux/Mac):
 *   0 2 * * * cd /path/to/cms && npm run backup >> /var/log/strapi-backup.log 2>&1
 * 
 * Schedule with Task Scheduler (Windows):
 *   Create a scheduled task to run: cmd /c "cd C:\path\to\cms && npm run backup"
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Configuration
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const MAX_BACKUPS = 7; // Keep only last 7 backups

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

// Validate all required environment variables
const missingVars = [];
if (!dbHost) missingVars.push('DATABASE_HOST');
if (!dbPort) missingVars.push('DATABASE_PORT');
if (!dbName) missingVars.push('DATABASE_NAME');
if (!dbUser) missingVars.push('DATABASE_USERNAME');
if (!dbPassword) missingVars.push('DATABASE_PASSWORD');

if (missingVars.length > 0) {
  console.error('❌ Error: Required environment variables are not set:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease set these variables in your .env file.');
  process.exit(1);
}

// Generate backup filename with timestamp
const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const timeWithHours = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').slice(0, -5); // YYYY-MM-DD_HH-MM-SS
const filename = `backup-${timeWithHours}.sql`;
const backupPath = path.join(BACKUP_DIR, filename);

console.log('🚀 Starting database backup...\n');
console.log(`📊 Database: ${dbName}`);
console.log(`🖥️  Host: ${dbHost}:${dbPort}`);
console.log(`💾 Backup file: ${filename}\n`);

// Build mysqldump command
// Note: Using --password in command line is not secure for production
// For production, use .my.cnf file or environment-based credential management
const mysqldumpCmd = `mysqldump -h ${dbHost} -P ${dbPort} -u ${dbUser} -p${dbPassword} ${dbName} > "${backupPath}"`;

// Execute backup
exec(mysqldumpCmd, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Backup failed!');
    console.error('Error:', error.message);
    if (stderr) console.error('Details:', stderr);
    process.exit(1);
  }
  
  // Check if backup file was created and has content
  try {
    const stats = fs.statSync(backupPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    if (stats.size === 0) {
      console.error('❌ Backup file is empty!');
      fs.unlinkSync(backupPath); // Remove empty file
      process.exit(1);
    }
    
    console.log(`✅ Database backup created successfully!`);
    console.log(`📦 File size: ${fileSizeMB} MB`);
    console.log(`📍 Location: ${backupPath}\n`);
    
    // Clean up old backups (keep only last MAX_BACKUPS)
    console.log(`🧹 Cleaning up old backups (keeping last ${MAX_BACKUPS})...`);
    
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
      .map(file => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time); // Sort by newest first
    
    // Remove old backups
    const backupsToDelete = files.slice(MAX_BACKUPS);
    backupsToDelete.forEach(file => {
      fs.unlinkSync(file.path);
      console.log(`🗑️  Deleted old backup: ${file.name}`);
    });
    
    if (backupsToDelete.length === 0) {
      console.log('✨ No old backups to delete');
    }
    
    console.log(`\n📚 Total backups retained: ${Math.min(files.length, MAX_BACKUPS)}`);
    console.log('✅ Backup process completed successfully!');
    
  } catch (err) {
    console.error('❌ Error checking backup file:', err.message);
    process.exit(1);
  }
});

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n⚠️  Backup interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Backup terminated');
  process.exit(1);
});
