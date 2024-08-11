const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const db = require("../models");
const { Op } = db.Sequelize;
const Order = db.order;
const redisCache = require("../middleware/redisCache");

const BillV2Controller = {
  async findAll(req, res) {
    try {
      const cacheKey = "billsV2:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getBills = await Order.findAll();

      if (!getBills.length) {
        return responseJson(res, 400, "Failed: Bills is empty");
      }

      const response = {
        message: "Success",
        data: getBills.map((bill) => bill.details),
      };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `billsV2:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getBill = await Order.findOne({
        where: { id },
      });

      if (!getBill) {
        return responseJson(res, 400, "Failed: Bill is not found");
      }

      const response = { message: "Success", data: getBill.details };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async findByDate(req, res) {
    try {
      const { start, end } = req.query;

      const cacheKey = `billsV2:findByDate:${start}|${end}`;
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      let dateFilter = {};
      if (start && end) {
        dateFilter = {
          createdAt: {
            [Op.between]: [new Date(start), new Date(end)],
          },
        };
      }

      const getBills = await Order.findAll({
        where: dateFilter,
      });

      if (!getBills.length) {
        return responseJson(res, 400, "Failed: Bills are empty");
      }

      const response = {
        message: "Success",
        data: getBills.map((bill) => bill.details),
      };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },
};

module.exports = BillV2Controller;
