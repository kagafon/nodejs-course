const winston = require('winston');
const expressWinston = require('express-winston');
const { HttpError, InternalServerError } = require('http-errors');
const { exit } = process;

require('winston-daily-rotate-file');

const eventLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'all-%DATE%.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  meta: false
});

const expressEventLogger = expressWinston.logger({
  winstonInstance: eventLogger,
  statusLevels: true,
  meta: false,
  msg:
    'HTTP ({{res.statusCode}}) {{req.method}}: {{req.path}}, query params: {{JSON.stringify(req.query)}}, request body: {{JSON.stringify(req.body)}}'
});

const errorLogger = expressWinston.errorLogger({
  winstonInstance: eventLogger,
  meta: false,
  statusLevels: true,
  dumpExceptions: true,
  showStack: true,
  msg:
    'HTTP ({{err.statusCode}}) {{req.method}}: {{req.path}}, query params: {{JSON.stringify(req.query)}}, request body: {{JSON.stringify(req.body)}}, message: {{err.message}}',
  skip: (req, res, err) => err && err instanceof HttpError
});

const errorHandler = (err, req, res, next) => {
  if (err && err instanceof HttpError) {
    res.status(err.statusCode).json(err.message);
    return;
  }
  errorLogger(err, req, res, next);
  err = new InternalServerError();
  res.status(err.statusCode).json(err.message);
};

const unhandledPromiseRejectionHandler = err => {
  eventLogger.log({
    level: 'error',
    message: `Unhandled promise rejection: ${err.message}, stack: ${err.stack}`
  });
};

const uncaughtExceptionHandler = err => {
  eventLogger.log({
    level: 'error',
    message: `Unhandled exception: ${err.message}, stack: ${err.stack}`
  });
  eventLogger.on('finish', () => exit(1));
  // Continue regular process shutdown.
  // https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
};

module.exports = {
  expressEventLogger,
  errorHandler,
  unhandledPromiseRejectionHandler,
  uncaughtExceptionHandler
};
