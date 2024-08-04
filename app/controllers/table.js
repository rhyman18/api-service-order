const responseJson = require("../utils/response");
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
};

module.exports = TableController;
