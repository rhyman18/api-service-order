const responseJson = require("../utils/response");
const CheckModel = require("../models/checkModel");

const CheckController = {
  async db(req, res) {
    const status = await CheckModel();
    const responseCode = status.ok ? 200 : 500;

    return responseJson(res, responseCode, status.response);
  },

  async auth(req, res) {
    return responseJson(res, 200, "Authorized");
  },
};

module.exports = CheckController;
