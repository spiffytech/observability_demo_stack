const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: "observability"});
module.exports = logger;
