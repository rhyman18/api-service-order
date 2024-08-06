const responseJson = require("../utils/response");
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
};

module.exports = PrinterJobController;
