const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const { printerSchema } = require("../utils/validate");
const db = require("../models");
const Printer = db.printer;
const redisCache = require("../middleware/redisCache");

const PrinterController = {
  async findAll(req, res) {
    try {
      const cacheKey = "printers:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinters = await Printer.findAll();

      if (!getPrinters.length) {
        return responseJson(res, 400, "Failed: Printers is empty");
      }

      const response = { message: "Success", data: getPrinters };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `printers:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinter = await Printer.findOne({
        where: { id },
      });

      if (!getPrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      const response = { message: "Success", data: getPrinter };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const { error } = printerSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const createPrinter = await Printer.create({
        name: req.body.name,
      });

      const cacheKey = `printers:${createPrinter.id}`;
      const response = { message: "Success", data: createPrinter };
      await redisCache.set(cacheKey, response);
      await redisCache.del("printers:all");

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = printerSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const id = req.params.id;
      const cacheKey = `printers:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const updatePrinter = await Printer.update(
        {
          name: req.body.name,
        },
        {
          where: { id },
        }
      );

      if (updatePrinter[0] === 0) {
        return responseJson(
          res,
          404,
          "Failed: No change detected or Printer not found"
        );
      }

      const keys = [cacheKey, "printers:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `printers:${id}`;

      const deletePrinter = await Printer.destroy({
        where: { id },
      });

      if (!deletePrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      const keys = [cacheKey, "printers:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterController;
