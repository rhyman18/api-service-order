const responseJson = require("../utils/response");
const CheckController = require("../controllers/checkController");

const apiRoutes = (app) => {
  /**
   * @swagger
   * /api/check:
   *   get:
   *     summary: Check Database Connection.
   *     description: To check the database connection is established.
   *     tags:
   *       - Check
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Connection has been established successfully.
   *                 data:
   *                   type: object
   *                   nullable: true
   *                   example: null
   *       500:
   *         description: Unable to connect to the database.
   */
  app.get("/api/check", (req, res) => {
    CheckController.db(req, res);
  });

  app.all("*", (req, res) => {
    return responseJson(
      res,
      404,
      "Not found. Please read API Docs @ /api/docs"
    );
  });
};

module.exports = apiRoutes;
