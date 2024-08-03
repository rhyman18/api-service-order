const responseJson = require("../utils/response");

const apiRoutes = (app) => {
  app.all("*", (req, res) => {
    return responseJson(
      res,
      404,
      "Not found. Please read API Docs @ /api/docs"
    );
  });
};

module.exports = apiRoutes;
