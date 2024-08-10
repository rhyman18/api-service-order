require("dotenv").config();
const Redis = require("ioredis");

class RedisCache {
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

    this.redisClient.on("error", (err) => {
      console.error("Redis error:", err.message);
    });

    this.redisClient.on("connect", () => {
      console.log("Connected to Redis");
    });

    this.redisClient.on("close", () => {
      console.log("Disconnected from Redis");
    });
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(key, value) {
    await this.redisClient.set(
      key,
      JSON.stringify(value),
      "EX",
      process.env.REDIS_EXPIRE
    );
  }

  async del(key) {
    await this.redisClient.del(key);
  }

  status() {
    return this.redisClient.status;
  }
}

module.exports = new RedisCache();
