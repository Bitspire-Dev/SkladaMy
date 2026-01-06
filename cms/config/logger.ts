import path from 'path';
import winston from 'winston';

export default ({ env }) => {
  const logLevel = env('LOG_LEVEL', 'info');
  const isProd = env('NODE_ENV') === 'production';

  // Create logs directory
  const logDir = path.join(__dirname, '..', 'logs');

  // Custom format for file logs
  const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
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
    })
  );

  return {
    level: logLevel,
    format: isProd ? fileFormat : consoleFormat,
    transports: [
      // Console output
      new winston.transports.Console({
        format: consoleFormat,
      }),
      // All logs to file
      new winston.transports.File({
        filename: path.join(logDir, 'strapi.log'),
        format: fileFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),
      // Errors only
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: fileFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),
    ],
  };
};
