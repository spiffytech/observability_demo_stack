const express = require('express')
const app = express()
const port = 3000

const logger = require('./lib/logger');
const redis = require('./lib/redis');

app.get('/', async (req, res) => {
    try {
        await redis.setValue();
        res.send('Hello World!');
    } catch(ex) {
        logger.error(ex.message);
        res.send(ex.message);
    }
});

app.get('/redis/contents', async (req, res) => {
    try {
        const value = await redis.getValue();
        res.send(value);
    } catch(ex) {
        logger.error(ex.message);
        res.send(ex.message);
    }
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))
