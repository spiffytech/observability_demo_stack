const StatsD = require('hot-shots');
const logger = require('./logger');

logger.info(`Logging to statsd at ${process.env.STATSD_HOST}`);

const client = new StatsD(
    {
        host: process.env.STATSD_HOST,
        port: 8125,
        telegraf: true,
        globalTags: {
            env: process.env.NODE_ENV,
            errorHandler: (err) => logger.error(`Encountered an error with Statsd: ${err}`),
        }
    }
);

module.exports = client;
