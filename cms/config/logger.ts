import path from 'path';
import fs from 'fs';
import winston from 'winston';

export default ({ env }) => {
  const logLevel = env('LOG_LEVEL', 'info');
  const isProd = env('NODE_ENV') === 'production';

  // Create logs directory (recursive — avoids ENOENT on first run / fresh
  // deploy where logs/ doesn't exist yet).
  const logDir = path.join(__dirname, '..', 'logs');
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (err) {
    // Don't crash startup if the directory can't be created (e.g. read-only
    // fs in some hosting); console transport still works.
    // eslint-disable-next-line no-console
    console.warn('[logger] Could not create logs directory:', err.message);
  }

  // Custom format for file logs
  const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  );

  // Console format (pretty in dev)
  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let msg = `${timestamp} ${level}: ${message}`;
      if (Object.keys(meta).length > 0) {
        msg += ` ${JSON.stringify(meta)}`;
      }
      return msg;
    }),
  );

  type TransportWithFormat = {
    format?: winston.Logform.Format;
    level?: string;
  };

  const consoleTransport = new winston.transports.Console();
  (consoleTransport as TransportWithFormat).format = consoleFormat;

  const fileTransport = new winston.transports.File({
    filename: path.join(logDir, 'strapi.log'),
    maxsize: 10485760, // 10MB
    maxFiles: 5,
  });
  (fileTransport as TransportWithFormat).format = fileFormat;

  const errorTransport = new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    maxsize: 10485760, // 10MB
    maxFiles: 5,
  });
  (errorTransport as TransportWithFormat).level = 'error';
  (errorTransport as TransportWithFormat).format = fileFormat;

  return {
    level: logLevel,
    format: isProd ? fileFormat : consoleFormat,
    transports: [consoleTransport, fileTransport, errorTransport],
  };
};
