const winston = require("winston");
const LogLevel = require("../const");
const logger = new winston.createLogger({
  level: LogLevel.INFO,
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

module.exports = logger;
