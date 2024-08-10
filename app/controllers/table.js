const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const { tableSchema } = require("../utils/validate");
const db = require("../models");
const Table = db.table;
const redisCache = require("../middleware/redisCache");

const TableController = {
  async findAll(req, res) {
    try {
      const cacheKey = "tables:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getTables = await Table.findAll();

      if (!getTables.length) {
        return responseJson(res, 400, "Failed: Tables is empty");
      }

      const response = { message: "Success", data: getTables };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `tables:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getTable = await Table.findOne({
        where: { id },
      });

      if (!getTable) {
        return responseJson(res, 404, "Failed: Table not found");
      }

      const response = { message: "Success", data: getTable };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const { error } = tableSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const createTable = await Table.create({
        name: req.body.name,
      });

      const cacheKey = `tables:${createTable.id}`;
      const response = { message: "Success", data: createTable };
      await redisCache.set(cacheKey, response);
      await redisCache.del("tables:all");

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = tableSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const id = req.params.id;
      const cacheKey = `tables:${id}`;

      const updateTable = await Table.update(
        {
          name: req.body.name,
        },
        {
          where: { id },
        }
      );

      if (updateTable[0] === 0) {
        return responseJson(
          res,
          404,
          "Failed: No change detected or Table not found"
        );
      }

      const keys = [cacheKey, "tables:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `tables:${id}`;

      const deletePrinter = await Table.destroy({
        where: { id },
      });

      if (!deletePrinter) {
        return responseJson(res, 404, "Failed: Table not found");
      }

      const keys = [cacheKey, "tables:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = TableController;
