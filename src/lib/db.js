const pgp = require('pg-promise')()

const client = pgp({
    host: process.env.PG_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
});


module.exports = client;
