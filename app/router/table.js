const express = require("express");
const tableRoute = express.Router();
const TableController = require("../controllers/table");
const verifyToken = require("../middleware/verifyJwtToken");

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
 verifyToken(req, res, TableController.findAll);
});

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Get Info Table
 *     description: To get a list of one Table based on id
 *     tags:
 *       - Tables
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The table ID
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: MEJA NO 1
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Table not found
 */
tableRoute.get("/tables/:id", (req, res) => {
  verifyToken(req, res, TableController.findOne);
});

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Add Table
 *     description: Create a new table
 *     tags:
 *       - Tables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the table
 *                 example: MEJA NO 1
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully created table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: MEJA NO 1
 *       400:
 *         description: Failed Invalid message
 */
tableRoute.post("/tables", (req, res) => {
  verifyToken(req, res, TableController.create);
});

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Update Table
 *     description: Update an existing table
 *     tags:
 *       - Tables
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the table
 *                 example: MEJA NO 1
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully updated table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Table not found
 */
tableRoute.put("/tables/:id", (req, res) => {
  verifyToken(req, res, TableController.update);
});

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Delete Table
 *     description: Delete an existing table
 *     tags:
 *       - Tables
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The table ID
 *     responses:
 *       200:
 *         description: Successfully deleted table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Table not found
 */
tableRoute.delete("/tables/:id", (req, res) => {
  verifyToken(req, res, TableController.destroy);
});

module.exports = tableRoute;
