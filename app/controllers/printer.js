const responseJson = require("../utils/response");
const db = require("../models");
const Printer = db.printer;

const PrinterController = {
  async findAll(req, res) {
    try {
      const getPrinters = await Printer.findAll();
      return responseJson(res, 200, "Success", getPrinters);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterController;
