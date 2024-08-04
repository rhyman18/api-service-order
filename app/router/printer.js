const express = require("express");
const printerRoute = express.Router();
const PrinterController = require("../controllers/printer");

/**
 * @swagger
 * /api/printers:
 *   get:
 *     summary: Get List Printers
 *     description: To get a list of all printer devices
 *     tags:
 *       - Printers
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
 *                         example: Printer Kasir
 *       400:
 *         description: Failed Invalid message
 */
printerRoute.get("/printers", (req, res) => {
  PrinterController.findAll(req, res);
});

/**
 * @swagger
 * /api/printers/{id}:
 *   get:
 *     summary: Get Info Printer
 *     description: To get a list of one printer device based on id
 *     tags:
 *       - Printers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The printer ID
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
 *                       example: Printer Kasir
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Printer not found
 */
printerRoute.get("/printers/:id", (req, res) => {
  PrinterController.findOne(req, res);
});

/**
 * @swagger
 * /api/printers:
 *   post:
 *     summary: Add Printer
 *     description: Create a new printer device
 *     tags:
 *       - Printers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the printer
 *                 example: Printer Kasir
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully created printer
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
 *                       example: Printer Kasir
 *       400:
 *         description: Failed Invalid message
 */
printerRoute.post("/printers", (req, res) => {
  PrinterController.create(req, res);
});

/**
 * @swagger
 * /api/printers/{id}:
 *   put:
 *     summary: Update Printer
 *     description: Update an existing printer device
 *     tags:
 *       - Printers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The printer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the printer
 *                 example: Printer Kasir
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully updated printer
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
 *         description: Failed Printer not found
 */
printerRoute.put("/printers/:id", (req, res) => {
  PrinterController.update(req, res);
});

/**
 * @swagger
 * /api/printers/{id}:
 *   delete:
 *     summary: Delete Printer
 *     description: Delete an existing printer device
 *     tags:
 *       - Printers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The printer ID
 *     responses:
 *       200:
 *         description: Successfully deleted printer
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
 *         description: Failed Printer not found
 */
printerRoute.delete("/printers/:id", (req, res) => {
  PrinterController.destroy(req, res);
});

module.exports = printerRoute;
