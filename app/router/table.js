const express = require("express");
const tableRoute = express.Router();
const TableController = require("../controllers/table");

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get List Tables
 *     description: To get a list of all tables
 *     tags:
 *       - Tables
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
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: MEJA NO 1
 *       400:
 *         description: Failed Invalid message
 */
tableRoute.get("/tables", (req, res) => {
  TableController.findAll(req, res);
});

module.exports = tableRoute;
