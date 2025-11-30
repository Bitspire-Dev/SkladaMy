/**
 * Transpile TS configs and middlewares to JS alongside sources.
 *
 * Why: Strapi loads .ts in develop (via ts-node/esbuild) but production runtime expects .js/.json.
 * This script lets you edit .ts locally and emit matching .js files for production.
 */
const fs = require('fs');
const path = require('path');
let ts;
try {
  ts = require('typescript');
} catch (e) {
  console.log('[build:config] TypeScript not installed; skipping TS→JS transpile (no-op).');
  // Graceful no-op so prebuild can run without devDependencies on server
}

const roots = [
  path.resolve(__dirname, '..', 'config'),
  path.resolve(__dirname, '..', 'src', 'middlewares'),
];

/** Walk a directory and collect .ts files (excluding .d.ts) */
function collectTsFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      collectTsFiles(full, out);
    } else if (e.isFile() && e.name.endsWith('.ts') && !e.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

function transpileFile(tsFile) {
  if (!ts) return null; // no-op when TS not present
  const source = fs.readFileSync(tsFile, 'utf8');
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2019,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: false,
      skipLibCheck: true,
      strict: false,
    },
    fileName: tsFile,
    reportDiagnostics: true,
  });

  if (result.diagnostics && result.diagnostics.length && ts) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(result.diagnostics, {
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
      getCanonicalFileName: (f) => f,
    });
    console.warn(`TypeScript diagnostics for ${tsFile}:\n${formatted}`);
  }

  const jsFile = tsFile.replace(/\.ts$/, '.js');
  fs.writeFileSync(jsFile, result.outputText, 'utf8');
  if (result.sourceMapText) {
    fs.writeFileSync(jsFile + '.map', result.sourceMapText, 'utf8');
  }
  return jsFile;
}

function main() {
  let total = 0;
  for (const root of roots) {
    const files = collectTsFiles(root);
    for (const f of files) {
      const out = transpileFile(f);
      if (out) {
        total++;
        console.log(`Emitted ${path.relative(process.cwd(), out)}`);
      }
    }
  }
  if (!ts) {
    console.log('[build:config] Completed with no TypeScript — nothing emitted.');
    return;
  }
  if (total === 0) {
    console.log('No TS config/middleware files found to transpile.');
  } else {
    console.log(`Done. Transpiled ${total} file(s).`);
  }
}

main();
