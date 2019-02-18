const logger = require('./logger');
const redis = require('./redis');
const statsd = require('./statsd');

setInterval(() => {
    statsd.increment('fooCounter', Math.round(Math.random() * 10));
    statsd.histogram('fooHistogram', Math.round(Math.random() * 40));
    logger.info('Sent metrics to statsd');
    for(let i = 0; i < Math.round(Math.random() * 5); i++) {
        redis.setValue();
    }
    for(let i = 0; i < Math.round(Math.random() * 50); i++) {
        redis.getValue();
    }
}, 1000);
