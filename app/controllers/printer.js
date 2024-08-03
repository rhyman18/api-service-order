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

  async findOne(req, res) {
    try {
      const getPrinter = await Printer.findOne({
        where: { id: req.params.id },
      });

      if (!getPrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      return responseJson(res, 200, "Success", getPrinter);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const createPrinter = await Printer.create({
        name: req.body.name,
      });

      return responseJson(res, 200, "Success", createPrinter);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterController;
