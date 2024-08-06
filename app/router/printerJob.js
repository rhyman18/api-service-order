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

/**
 * @swagger
 * /api/printer/jobs:
 *   post:
 *     summary: Add Printer Job
 *     description: Create a new printer job
 *     tags:
 *       - Printer Jobs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               printerId:
 *                 type: integer
 *                 description: The ID of the printer
 *                 example: 1
 *               productCategoryId:
 *                 type: integer
 *                 description: The ID of the product category
 *                 example: 1
 *             required:
 *               - printerId
 *               - productCategoryId
 *     responses:
 *       200:
 *         description: Successfully created printer job
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
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Printer/Product category not found
 */
printerJobRoute.post("/printer/jobs", (req, res) => {
  PrinterJobController.create(req, res);
});

/**
 * @swagger
 * /api/printer/jobs/{id}:
 *   put:
 *     summary: Update Printer Job
 *     description: Update an existing printer job
 *     tags:
 *       - Printer Jobs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The printer job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               printerId:
 *                 type: integer
 *                 description: The ID of the printer
 *                 example: 1
 *               productCategoryId:
 *                 type: integer
 *                 description: The ID of the product category
 *                 example: 1
 *             required:
 *               - printerId
 *               - productCategoryId
 *     responses:
 *       200:
 *         description: Successfully updated printer job
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
 *         description: Failed Printer/Product category not found
 */
printerJobRoute.put("/printer/jobs/:id", (req, res) => {
  PrinterJobController.update(req, res);
});

/**
 * @swagger
 * /api/printer/jobs/{id}:
 *   delete:
 *     summary: Delete Printer Job
 *     description: Delete an existing printer job
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
 *         description: Successfully deleted printer job
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
 *         description: Failed Printer job not found
 */
printerJobRoute.delete("/printer/jobs/:id", (req, res) => {
  PrinterJobController.destroy(req, res);
});

/**
 * @swagger
 * /api/printer/jobs/name/{printer}:
 *   get:
 *     summary: Get List Printer Jobs by Printer Name
 *     description: To get a list of all printer jobs filtered by printer name
 *     tags:
 *       - Printer Jobs
 *     parameters:
 *       - name: printer
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: Printer Kasir
 *         description: The name of the printer
 *     responses:
 *       200:
 *         description: Successfully retrieved printer jobs
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
 *       404:
 *         description: Failed No Printer jobs found
 */
printerJobRoute.get("/printer/jobs/name/:printer", (req, res) => {
  PrinterJobController.findByPrinter(req, res);
});

/**
 * @swagger
 * /api/printer/jobs/category/{category}:
 *   get:
 *     summary: Get List Printer Jobs by Product Category
 *     description: To get a list of all printer jobs filtered by product category
 *     tags:
 *       - Printer Jobs
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: Minuman
 *         description: The name of the product category
 *     responses:
 *       200:
 *         description: Successfully retrieved printer jobs
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
 *                       productCategory:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Minuman
 *                       printer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Printer Kasir
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed No Printer jobs found
 */
printerJobRoute.get("/printer/jobs/category/:category", (req, res) => {
  PrinterJobController.findByCategory(req, res);
});

module.exports = printerJobRoute;
