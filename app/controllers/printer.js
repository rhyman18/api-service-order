const responseJson = require("../utils/response");
const { printerSchema } = require("../utils/validate");
const db = require("../models");
const Printer = db.printer;

const PrinterController = {
  async findAll(req, res) {
    try {
      const getPrinters = await Printer.findAll();

      if (!getPrinters.length) {
        return responseJson(res, 400, "Failed: Printers is empty");
      }

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
      const { error } = printerSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const createPrinter = await Printer.create({
        name: req.body.name,
      });

      return responseJson(res, 200, "Success", createPrinter);
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

      const updatePrinter = await Printer.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updatePrinter[0] === 0) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const deletePrinter = await Printer.destroy({
        where: { id: req.params.id },
      });

      if (!deletePrinter) {
        return responseJson(res, 404, "Failed: Printer not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = PrinterController;
