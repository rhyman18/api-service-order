const express = require("express");
const printerJobRoute = express.Router();
const PrinterJobController = require("../controllers/printerJob");

/**
 * @swagger
 * /api/printer/jobs:
 *   get:
 *     summary: Get List Printer Jobs
 *     description: To get a list of all printer jobs
 *     tags:
 *       - Printer Jobs
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
 *                       printerId:
 *                         type: integer
 *                         example: 1
 *                       productCategoryId:
 *                         type: integer
 *                         example: 1
 *                       printer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Printer Kasir
 *                       productCategory:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Minuman
 *       400:
 *         description: Failed Invalid message
 */
printerJobRoute.get("/printer/jobs", (req, res) => {
  PrinterJobController.findAll(req, res);
});

/**
 * @swagger
 * /api/printer/jobs/{id}:
 *   get:
 *     summary: Get Info Printer Jobs
 *     description: To get info of a printer job based on its ID
 *     tags:
 *       - Printer Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The printer job ID
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
 *                     printerId:
 *                       type: integer
 *                       example: 1
 *                     productCategoryId:
 *                       type: integer
 *                       example: 1
 *                     printer:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Printer Kasir
 *                     productCategory:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Minuman
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Printer Job not found
 */

printerJobRoute.get("/printer/jobs/:id", (req, res) => {
  PrinterJobController.findOne(req, res);
});

module.exports = printerJobRoute;
