const {
  unhandledPromiseRejectionHandler,
  uncaughtExceptionHandler
} = require('./middleware/logger');

process
  .on('unhandledRejection', unhandledPromiseRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler);

const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
