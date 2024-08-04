const express = require("express");
const checkRoute = express.Router();
const CheckController = require("../controllers/checkController");

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
checkRoute.get("/check", (req, res) => {
  CheckController.db(req, res);
});

module.exports = checkRoute;
