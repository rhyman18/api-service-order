const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const { printerJobSchema } = require("../utils/validate");
const db = require("../models");
const PrinterJob = db.printerJob;
const Printer = db.printer;
const ProductCategory = db.productCategory;
const redisCache = require("../middleware/redisCache");

const PrinterJobController = {
  async findAll(req, res) {
    try {
      const cacheKey = "printerJobs:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinterJobs = await PrinterJob.findAll({
        include: [{ model: Printer }, { model: ProductCategory }],
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: Printer Jobs is empty");
      }

      const response = { message: "Success", data: getPrinterJobs };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `printerJobs:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinterJob = await PrinterJob.findOne({
        where: { id },
        include: [{ model: Printer }, { model: ProductCategory }],
      });

      if (!getPrinterJob) {
        return responseJson(res, 404, "Failed: Printer Job not found");
      }

      const response = { message: "Success", data: getPrinterJob };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const { error } = printerJobSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { printerId, productCategoryId } = req.body;

      const checkPrinter = await Printer.findByPk(printerId);

      if (!checkPrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      const checkProductCategory = await ProductCategory.findByPk(
        productCategoryId
      );

      if (!checkProductCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      const existingPrinterJob = await PrinterJob.findOne({
        where: { printerId, productCategoryId },
      });

      if (existingPrinterJob) {
        return responseJson(res, 400, "Failed: Printer job already registered");
      }

      const createPrinterJob = await PrinterJob.create({
        printerId,
        productCategoryId,
      });

      const cacheKey = `printerJobs:${createPrinterJob.id}`;
      const response = { message: "Success", data: createPrinterJob };
      await redisCache.set(cacheKey, response);
      await redisCache.del("printerJobs:all");

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = printerJobSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { printerId, productCategoryId } = req.body;

      const checkPrinter = await Printer.findByPk(printerId);

      if (!checkPrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      const checkProductCategory = await ProductCategory.findByPk(
        productCategoryId
      );

      if (!checkProductCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      const existingPrinterJob = await PrinterJob.findOne({
        where: { printerId, productCategoryId },
      });

      if (existingPrinterJob) {
        return responseJson(res, 400, "Failed: Printer job already registered");
      }

      const id = req.params.id;
      const cacheKey = `printerJobs:${id}`;

      const updatePrinterJob = await PrinterJob.update(
        {
          printerId,
          productCategoryId,
        },
        {
          where: { id },
        }
      );

      if (updatePrinterJob[0] === 0) {
        return responseJson(
          res,
          404,
          "Failed: No change detected or Printer job not found"
        );
      }

      const findByPrinterKey = await redisCache.keys(
        "printerJobs:findByPrinter:*"
      );
      const findByCategoryKey = await redisCache.keys(
        "printerJobs:findByCategory:*"
      );
      const keys = [
        cacheKey,
        "printerJobs:all",
        ...findByPrinterKey,
        ...findByCategoryKey,
      ];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `printerJobs:${id}`;

      const deletePrinterJob = await PrinterJob.destroy({
        where: { id },
      });

      if (!deletePrinterJob) {
        return responseJson(res, 404, "Failed: Printer job not found");
      }

      const findByPrinterKey = await redisCache.keys(
        "printerJobs:findByPrinter:*"
      );
      const findByCategoryKey = await redisCache.keys(
        "printerJobs:findByCategory:*"
      );
      const keys = [
        cacheKey,
        "printerJobs:all",
        ...findByPrinterKey,
        ...findByCategoryKey,
      ];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByPrinter(req, res) {
    try {
      const name = req.params.printer;
      const cacheKey = `printerJobs:findByPrinter:${name}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinterJobs = await PrinterJob.findAll({
        include: [
          { model: Printer, where: { name } },
          { model: ProductCategory },
        ],
        attributes: { exclude: ["printerId", "productCategoryId"] },
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: No Printer jobs found");
      }

      const response = { message: "Success", data: getPrinterJobs };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByCategory(req, res) {
    try {
      const name = req.params.category;
      const cacheKey = `printerJobs:findByCategory:${name}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getPrinterJobs = await PrinterJob.findAll({
        include: [
          { model: ProductCategory, where: { name } },
          { model: Printer },
        ],
        attributes: { exclude: ["printerId", "productCategoryId"] },
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: No Printer jobs found");
      }

      const response = { message: "Success", data: getPrinterJobs };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterJobController;
