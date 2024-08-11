const express = require("express");
const billV2Route = express.Router();
const BillV2Controller = require("../controllers/billV2");
const verifyToken = require("../middleware/verifyJwtToken");

/**
 * @swagger
 * /api/bills/v2:
 *   get:
 *     summary: Get List of Bills
 *     description: Retrieve a list of all bills with detailed information about each bill and its products.
 *     tags:
 *       - Bills
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
 *                         example: 28
 *                       customerName:
 *                         type: string
 *                         example: John Doe
 *                       paymentMethod:
 *                         type: string
 *                         example: Credit Card
 *                       tableName:
 *                         type: string
 *                         example: MEJA NO 1
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             category:
 *                               type: string
 *                               example: Makanan
 *                             name:
 *                               type: string
 *                               example: Mie
 *                             variant:
 *                               type: string
 *                               example: GORENG
 *                             price:
 *                               type: integer
 *                               example: 15000
 *                             quantity:
 *                               type: integer
 *                               example: 1
 *                             total:
 *                               type: integer
 *                               example: 15000
 *                       grandTotal:
 *                         type: integer
 *                         example: 87000
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-07T17:16:15.000Z
 *       400:
 *         description: Failed Invalid message
 */
billV2Route.get("/bills/v2", (req, res) => {
  verifyToken(req, res, BillV2Controller.findAll);
});

/**
 * @swagger
 * /api/bills/v2/date:
 *   get:
 *     summary: Get List of Bills by Date range
 *     description: Retrieve a list of all bills with detailed information about each bill and its products. Optionally, filter bills by date range.
 *     tags:
 *       - Bills
 *     parameters:
 *       - name: start
 *         in: query
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2024-08-05 00:00:00
 *         description: Start date for filtering bills
 *       - name: end
 *         in: query
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2024-08-10 00:00:00
 *         description: End date for filtering bills
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
 *                       customerName:
 *                         type: string
 *                         example: John Doe
 *                       paymentMethod:
 *                         type: string
 *                         example: Credit Card
 *                       tableName:
 *                         type: string
 *                         example: MEJA NO 1
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             category:
 *                               type: string
 *                               example: Minuman
 *                             name:
 *                               type: string
 *                               example: Jeruk
 *                             variant:
 *                               type: string
 *                               example: DINGIN
 *                             price:
 *                               type: integer
 *                               example: 12000
 *                             quantity:
 *                               type: integer
 *                               example: 1
 *                             total:
 *                               type: integer
 *                               example: 12000
 *                       grandTotal:
 *                         type: integer
 *                         example: 87000
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-07T17:16:15.000Z
 *       400:
 *         description: Failed Invalid message
 */
billV2Route.get("/bills/v2/date", (req, res) => {
  verifyToken(req, res, BillV2Controller.findByDate);
});

/**
 * @swagger
 * /api/bills/v2/{id}:
 *   get:
 *     summary: Get Bill Details
 *     description: Retrieve detailed information about a specific bill and its products.
 *     tags:
 *       - Bills
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The bill ID
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
 *                     customerName:
 *                       type: string
 *                       example: John Doe
 *                     paymentMethod:
 *                       type: string
 *                       example: Credit Card
 *                     tableName:
 *                       type: string
 *                       example: MEJA NO 1
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: Minuman
 *                           name:
 *                             type: string
 *                             example: Jeruk
 *                           variant:
 *                             type: string
 *                             example: DINGIN
 *                           price:
 *                             type: integer
 *                             example: 12000
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                           total:
 *                             type: integer
 *                             example: 12000
 *                     grandTotal:
 *                       type: integer
 *                       example: 87000
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-07T17:16:15.000Z
 *       400:
 *         description: Failed Invalid message
 */
billV2Route.get("/bills/v2/:id", (req, res) => {
  verifyToken(req, res, BillV2Controller.findOne);
});

module.exports = billV2Route;
