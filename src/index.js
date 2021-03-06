require('dotenv').config();
const express = require('express')
const app = express()
const port = 3005

const logger = require('./lib/logger');
const postgres = require('./lib/db');
const redis = require('./lib/redis');
const statsd = require('./lib/statsd');
require('./lib/metrics');

const db = require('./lib/db');
db.none('create table if not exists sample (metric integer)').catch(console.error);

app.get('/', async (req, res) => {
    try {
        const t1 = new Date().getTime();
        await redis.setValue();
        logger.info('Set a value in Redis');
        statsd.histogram('redis_set', new Date().getTime() - t1);
        statsd.increment('data_setting', console.log);
        res.send('Hello World!');
    } catch(ex) {
        logger.error(ex.message);
        res.send(ex.message);
    }
});

app.get('/redis/contents', async (req, res) => {
    try {
        const t1 = new Date().getTime();
        const value = await redis.getValue();
        logger.info('Read a message out of Redis');
        statsd.histogram('redis_get', new Date().getTime() - t1);
        statsd.increment('data_getting');
        res.send(value);
    } catch(ex) {
        logger.error(ex.message);
        res.send(ex.message);
    }
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))
