var Redis = require('ioredis');
var redis = new Redis();

module.exports.setValue = function setValue() {
    return redis.set('foo', 'bar');
}

module.exports.getValue = async function getValue() {
    return redis.get('foo');
}
