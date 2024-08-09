const express = require("express");
const checkRoute = express.Router();
const CheckController = require("../controllers/checkController");
const verifyToken = require("../middleware/verifyJwtToken");

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

/**
 * @swagger
 * /api/check/auth:
 *   get:
 *     summary: Check Authorization keys.
 *     description: To check if the token authorization is valid.
 *     tags:
 *       - Check
 *     security:
 *       - bearerAuth: []
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
 *                   example: Authorized.
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Unauthorized.
 */
checkRoute.get("/check/auth", (req, res) => {
  verifyToken(req, res, CheckController.db);
});

module.exports = checkRoute;
