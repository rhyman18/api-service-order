const responseJson = require("../utils/response");
const Joi = require("joi");
const db = require("../models");
const Printer = db.printer;

const createPrinterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
});

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
      const { error } = createPrinterSchema.validate(req.body);

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
      const { error } = createPrinterSchema.validate(req.body);

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
};

module.exports = PrinterController;
