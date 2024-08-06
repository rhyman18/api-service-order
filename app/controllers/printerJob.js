const responseJson = require("../utils/response");
const { printerJobSchema } = require("../utils/validate");
const db = require("../models");
const PrinterJob = db.printerJob;
const Printer = db.printer;
const ProductCategory = db.productCategory;

const PrinterJobController = {
  async findAll(req, res) {
    try {
      const getPrinterJobs = await PrinterJob.findAll({
        include: [{ model: Printer }, { model: ProductCategory }],
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: Printer Jobs is empty");
      }

      return responseJson(res, 200, "Success", getPrinterJobs);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const getPrinterJob = await PrinterJob.findOne({
        where: { id: req.params.id },
        include: [{ model: Printer }, { model: ProductCategory }],
      });

      if (!getPrinterJob) {
        return responseJson(res, 404, "Failed: Printer Job not found");
      }

      return responseJson(res, 200, "Success", getPrinterJob);
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

      return responseJson(res, 200, "Success", createPrinterJob);
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

      const updatePrinterJob = await PrinterJob.update(
        {
          printerId,
          productCategoryId,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updatePrinterJob[0] === 0) {
        return responseJson(res, 404, "Failed: Printer job not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const deletePrinterJob = await PrinterJob.destroy({
        where: { id: req.params.id },
      });

      if (!deletePrinterJob) {
        return responseJson(res, 404, "Failed: Printer job not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByPrinter(req, res) {
    try {
      const getPrinterJobs = await PrinterJob.findAll({
        include: [
          { model: Printer, where: { name: req.params.printer } },
          { model: ProductCategory },
        ],
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: No Printer jobs found");
      }

      return responseJson(res, 200, "Success", getPrinterJobs);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByCategory(req, res) {
    try {
      const getPrinterJobs = await PrinterJob.findAll({
        include: [
          { model: ProductCategory, where: { name: req.params.category } },
          { model: Printer },
        ],
        attributes: { exclude: ["printerId", "productCategoryId"] },
      });

      if (!getPrinterJobs.length) {
        return responseJson(res, 400, "Failed: No Printer jobs found");
      }

      return responseJson(res, 200, "Success", getPrinterJobs);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterJobController;
