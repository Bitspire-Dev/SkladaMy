
/* eslint-disable no-console */
'use strict';

// This file exists only because DirectAdmin/Passenger requires a “startup file”.
// It should behave as close as possible to `strapi start`, but run from compiled dist/.

require('dotenv').config();

const { createStrapi } = require('@strapi/strapi');

process.on('uncaughtException', (err) => {
	console.error('[server.js] Uncaught exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason) => {
	console.error('[server.js] Unhandled rejection:', reason);
});

createStrapi({ distDir: './dist' })
	.start()
	.catch((err) => {
		console.error('[server.js] FAILED TO START STRAPI:', err);
		process.exit(1);
	});

