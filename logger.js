'use strict';

const logger = require('winston');

if (process.env.LOGGLY_TOKEN) {
  require('winston-loggly-bulk');

  logger.add(logger.transports.Loggly, {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: ['Winston-NodeJS'],
    json: true,
  });
}

process.on('uncaughtException', (err) => {
  logger.error(`Unexpected error: ${err}`);
  logger.error(err);
  process.exit(1);
});

logger.log('info', 'Logger Initialised');

module.exports = logger;
