const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./common/config');
const { expressEventLogger, errorHandler } = require('./middleware/logger');
const { Unauthorized } = require('http-errors');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const authRouter = require('./resources/auth/auth.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app
  .use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  })
  .use(expressEventLogger)
  .use('/login', authRouter)
  .use('*', (req, res, next) => {
    console.log(req.headers);

    if (req.headers.authorization) {
      const authHeaderData = req.headers.authorization.split(' ');
      if (
        authHeaderData[0] === 'Bearer' &&
        jwt.verify(authHeaderData[1], JWT_SECRET_KEY)
      ) {
        return next();
      }
    }
    next(new Unauthorized());
  })
  .use('/users', userRouter)
  .use('/boards', boardRouter)
  .use(errorHandler);

module.exports = app;
