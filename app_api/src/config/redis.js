const redis = require('redis');
const logger = require('./logger');

const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const client = redis.createClient({
    url,
    legacyMode: false,
  });

client.on('error', (error) => {
    logger.error(error);
});
  
client.on('connect', () => {
    logger.info('Redis connected');
});


module.exports = client;