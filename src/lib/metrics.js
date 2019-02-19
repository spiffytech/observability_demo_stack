const db = require('./db');
const logger = require('./logger');
const redis = require('./redis');
const statsd = require('./statsd');

setInterval(async () => {
    statsd.increment('fooCounter', Math.round(Math.random() * 10));
    statsd.histogram('fooHistogram', Math.round(Math.random() * 40));
    logger.info('Sent metrics to statsd');
    for(let i = 0; i < Math.round(Math.random() * 5); i++) {
        redis.setValue();
    }
    for(let i = 0; i < Math.round(Math.random() * 50); i++) {
        redis.getValue();
    }

    await db.none(
        'insert into sample (metric) values (${metric})',
        {metric: Math.round(Math.random() * 27)}
    );
    console.log(await db.any('select metric from sample order by metric desc limit 3'));
    await db.none(
        'delete from sample where metric=${metric}',
        {metric: Math.round(Math.random() * 27)}
    )
}, 1000);
