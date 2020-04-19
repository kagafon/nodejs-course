const { connectToDB, closeConnection } = require('./db/db.client');

const {
  unhandledPromiseRejectionHandler,
  uncaughtExceptionHandler
} = require('./middleware/logger');

process
  .on('unhandledRejection', unhandledPromiseRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler)
  .on('beforeExit', closeConnection);

const { PORT } = require('./common/config');
const app = require('./app');

connectToDB(() =>
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
);
