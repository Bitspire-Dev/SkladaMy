/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-console */
"use strict";

process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { loadEnvConfig } = require("@next/env");
loadEnvConfig(__dirname, false);

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const portRaw = process.env.PORT;
if (!portRaw) {
  console.error(
    "[server.js] ERROR: PORT is not set. Start from DirectAdmin Node.js App (it injects PORT)."
  );
  process.exit(1);
}

const port = Number.parseInt(portRaw, 10);
if (!Number.isFinite(port)) {
  console.error("[server.js] ERROR: PORT is not a valid number:", portRaw);
  process.exit(1);
}

const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      await handle(req, res, parse(req.url, true));
    });

    server.on("error", (err) => {
      // Avoid double-printing (e.g. once here + once via uncaughtException handler)
      // by handling the listen error explicitly.
      console.error("[server.js] LISTEN FAILED:", err && err.code ? `${err.code}` : err);
      process.exit(1);
    });

    server.listen(port, hostname);
  })
  .catch((err) => {
    console.error("[server.js] FAILED:", err);
    process.exit(1);
  });
