const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const CheckModel = require("../models/checkModel");
const { redis } = require("../middleware/redisCache");

const CheckController = {
  async db(req, res) {
    const status = await CheckModel();
    const responseCode = status.ok ? 200 : 500;

    return responseJson(res, responseCode, status.response);
  },

  async auth(req, res) {
    return responseJson(res, 200, "Authorized");
  },

  async redis(req, res) {
    const response = { message: redis.status, data: null };
    return responseJsonV2(res, 200, response);
  },
};

module.exports = CheckController;
