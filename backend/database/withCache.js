const Redis = require('ioredis');
const redis = new Redis({
  port: 6379,
  host: '172.17.0.2'
});

const RedisAdaptor = require('sequelize-transparent-cache-ioredis');
const redisAdaptor = new RedisAdaptor(
  {
    client: redis,
    namespace: 'model',
    lifetime: 60 * 60
  }
);

const sequelizecache = require('sequelize-transparent-cache');
const {withCache} = sequelizecache(redisAdaptor);

module.exports = { withCache };