const express = require("express");
const billRoute = express.Router();
const BillController = require("../controllers/bill");

/**
 * @swagger
 * /api/bills:
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
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-07T17:16:15.000Z
 *       400:
 *         description: Failed Invalid message
 */
billRoute.get("/bills", (req, res) => {
  BillController.findAll(req, res);
});

module.exports = billRoute;
