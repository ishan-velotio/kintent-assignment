import * as httpContext from 'express-http-context';
import * as fs from 'fs';
import * as winston from 'winston';

import * as DailyRotateFile from 'winston-daily-rotate-file';

// TODO
// Take environment as input and configure logger accordingly.
const initLogger = () => {
  const logDir = 'logs';
  const isProduction = process.env.NODE_ENV === 'production';
  const tsFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const formatMessage = winston.format.printf(info => {
    const reqId = httpContext.get('reqId') || '';
    const baseMessage = `${info.metadata.timestamp} ${info.level} ${reqId}`;
    let message = `${baseMessage} ${info && info.message}`;
    if (typeof info.message === 'object') {
      message = `${baseMessage} ${JSON.stringify(info.message)}`;
    }
    if (info.metadata && info.metadata.stack) {
      message = `${baseMessage} ${info.metadata.statusCode || ''} ${
        info.metadata.stack
      }`;
    }

    return message;
  });

  const combinedDailyTransport = new DailyRotateFile({
    filename: `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    level: 'info',
    maxSize: '2m',
  });

  const errorDailyTransport = new DailyRotateFile({
    filename: `${logDir}/%DATE%.error.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    level: 'error',
    maxSize: '2m',
  });

  const transports = [];

  transports.push(combinedDailyTransport);
  transports.push(errorDailyTransport);

  if (!isProduction) {
    const consoleTransport = new winston.transports.Console({
      level: 'debug',
    });

    transports.push(consoleTransport);
  }

  const formats = [
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: tsFormat }),
    winston.format.metadata(),
    ...(isProduction ? [] : [winston.format.colorize({})]),
    formatMessage,
  ];

  winston.configure({
    format: winston.format.combine(...formats),
    transports,
    exceptionHandlers: isProduction ? [] : transports[2],
  });

  return winston;
};

export { initLogger };
export default winston;
