require("dotenv").config();
const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisCache = async (redisKey, dataToCache) => {
  const cachedData = await redis.get(redisKey);

  if (!cachedData) {
    await redis.set(redisKey, JSON.stringify(dataToCache));
    return dataToCache;
  }

  return JSON.parse(cachedData);
};

module.exports = { redisCache, redis };
