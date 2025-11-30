# CMS Architecture and Deployment Guide

This document explains the structure and conventions of the `cms` folder, which hosts a Strapi v5 application written primarily in TypeScript, with minimal JavaScript runtime shims where appropriate. It also documents what was cleaned up and why.

## High-level design
- Runtime: Strapi v5.23 on Node 18–22.
- Language: TypeScript-first for app code. JavaScript is only used for small runtime scripts (e.g., `server.js`, `generate-keys.js`).
- Build: `npm run build` compiles TS and builds the admin panel.
- Start:
  - Development: `npm run develop` (localhost:1337)
  - Production: `npm run start` or use `server.js` as Application startup file on hosting panels.

## Folder overview
- `config/`: Strapi configuration (server, database, plugins, middlewares order).
- `src/`: Application source in TS.
  - `api/`: Content-types and business logic.
  - `middlewares/`: Custom Koa middlewares (TS sources; loaded as `global::name`).
  - `index.ts`: Bootstrap and optional registration logic.
- `scripts/`: Utility scripts (seeders). Uses a JS wrapper that optionally loads TS with ts-node.
- `vendor/`: Small compatibility shims for fragile transitive deps (`boolean`, `lodash.get`).
- `public/`: Public assets and uploads (served by Strapi).
- `server.js`: Minimal programmatic startup for constrained hosts (FTP panels).
- `.env` / `.env.development`: Environment configuration for prod/dev.

## TypeScript vs JavaScript
- TS (.ts) used for all Strapi app sources:
  - `src/**/*`, `config/**/*.ts`
  - Examples: `src/api/**`, `src/middlewares/**/index.ts`, `config/server.ts`, `config/database.ts`.
- JS (.js) used for tiny runtime utilities only:
  - `server.js` (hosting startup)
  - `generate-keys.js` (key generator)
  - `scripts/seed-blog-posts.js` (wrapper that loads TS via ts-node when present)
- Removed duplicates: the JS copies of `src/middlewares/*/index.js` were deleted to maintain a single TS source of truth; Strapi resolves them via `global::middleware-name` after build.

## Custom middlewares
- Registered in `config/middlewares.ts` using canonical names:
  - `global::healthz` → `src/middlewares/healthz/index.ts`
  - `global::security-headers` → `src/middlewares/security-headers/index.ts`
- Both middlewares avoid importing `koa` types directly to keep builds simple.
- Security headers are conservative in dev and safe in prod; CORS is handled primarily by `strapi::cors` with environment overrides.

## Environments
- Development:
  - `.env.development` forces localhost defaults:
    - HOST=127.0.0.1, PORT=1337, PUBLIC_URL=http://localhost:1337
  - `npm run develop` sets the same env with cross-env to be explicit on Windows.
- Production:
  - `.env` contains hosting values (public URL at seohost, TRUST_PROXY=true, etc.).
  - Use `server.js` as Application startup file on the host.

## Database
- Default is SQLite with file path `.tmp/data.db` (relative) for portability.
- Postgres/MySQL configs are present and can be enabled by env variables.

## Email
- SendGrid provider configured via env in `config/plugins.ts`.

## Vendor shims
- `vendor/boolean-compat`: Provides a stable `boolean` implementation; the dependency in `package.json` points to this folder.
- `vendor/lodash.get-compat`: Minimal implementation of `lodash.get`; used to avoid registry hiccups.

## PM2 config
- `ecosystem.config.ts` explains how to run via PM2 if you deploy with SSH (not required for FTP-only hosting). It defines a single app in fork mode and a sample deploy section. For seohost, you typically won’t use PM2—keep this file only if you plan server deployments.

## server.js
- Purpose: minimal, robust entry for hosting panels where `node_modules` may be mounted outside the app root. It starts Strapi programmatically. It also attempts a one-time admin build when missing, but gracefully skips if not possible.
- Set this file as the Application startup file on the hosting panel.

## Cleanups performed
- Consolidated middlewares to TS-only; removed duplicate JS copies.
- Removed unused `generate-keys.ts` (JS version retained and used).
- Fixed duplicated code in `vendor/lodash.get-compat/index.js`.
- Simplified `.npmrc` to avoid surprising logs.
- Ensured dev uses localhost via `.env.development` and `package.json` scripts.

## Why this is complete and consistent
- Single source of truth in TS for Strapi app code avoids drift.
- Canonical middleware registration (`global::...`) matches Strapi conventions and survives builds.
- Environment separation prevents production URLs from leaking into dev.
- Vendor shims stabilize known fragile dependencies.
- Hosting entry (`server.js`) is minimal and production-safe for constrained environments.

## How to run
- Local development:
  1) cd cms
  2) npm install
  3) npm run develop
- Production (hosting panel):
  - Upload project via FTP, set `server.js` as the start file, and configure `.env` with keys and PUBLIC_URL; the panel will run `server.js`.

## Further improvements (optional)
- Convert the long seeding TS file to a smaller modular set of seeds.
- If admin build on host is memory-limited, build locally (`npm run build`) and upload the `build/` directory.
