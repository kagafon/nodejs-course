const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  expressEventLogger,
  errorHandler,
  unhandledPromiseRejectionHandler,
  uncaughtExceptionHandler
} = require('./middleware/logger');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(expressEventLogger);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(errorHandler);

process
  .on('unhandledRejection', unhandledPromiseRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler);

module.exports = app;
