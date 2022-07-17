const logger = require('./config/logger');
const app = require('./server');
const client = require('./config/redis');

const { DEFAULT_PORT } = require('./const');
const port = process.env.PORT | DEFAULT_PORT;

app.listen(port, process.env.HOST, async () => {
    try {
      logger.info(`App is up and running on port ${port}`);
      await client.connect();
      logger.info('Redis connection has been established successfully.');
    } catch (error) {
      logger.error(`Unable to connect to the redis. Error: ${error}`);
    }
  });