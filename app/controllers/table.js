const responseJson = require("../utils/response");
const { tableSchema } = require("../utils/validate");
const db = require("../models");
const Table = db.table;

const TableController = {
  async findAll(req, res) {
    try {
      const getTables = await Table.findAll();

      if (!getTables.length) {
        return responseJson(res, 400, "Failed: Tables is empty");
      }

      return responseJson(res, 200, "Success", getTables);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const getTable = await Table.findOne({
        where: { id: req.params.id },
      });

      if (!getTable) {
        return responseJson(res, 404, "Failed: Table not found");
      }

      return responseJson(res, 200, "Success", getTable);
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

      return responseJson(res, 200, "Success", createTable);
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

      const updateTable = await Table.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updateTable[0] === 0) {
        return responseJson(res, 404, "Failed: Table not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const deletePrinter = await Table.destroy({
        where: { id: req.params.id },
      });

      if (!deletePrinter) {
        return responseJson(res, 404, "Failed: Table not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = TableController;
