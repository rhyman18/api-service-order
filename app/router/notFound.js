const express = require("express");
const notFoundRoute = express.Router();
const responseJson = require("../utils/response");

notFoundRoute.all("*", (req, res) => {
  return responseJson(res, 404, "Not found. Please read API Docs @ /api/docs");
});

module.exports = notFoundRoute;
