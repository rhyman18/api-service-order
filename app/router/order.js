const express = require("express");
const orderRoute = express.Router();
const OrderController = require("../controllers/order");

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for a restaurant.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: The name of the customer
 *                 example: John Doe
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method used
 *                 example: Credit Card
 *               tableId:
 *                 type: integer
 *                 description: The ID of the table where the order was placed
 *                 example: 1
 *               orderProducts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the product variant
 *                       example: 1
 *                     qty:
 *                       type: integer
 *                       description: The quantity of the product
 *                       example: 1
 *                 description: List of ordered products with their quantities
 *                 example:
 *                   - id: 1
 *                     qty: 1
 *                   - id: 6
 *                     qty: 1
 *                   - id: 11
 *                     qty: 2
 *                   - id: 3
 *                     qty: 1
 *                   - id: 8
 *                     qty: 1
 *             required:
 *               - customerName
 *               - paymentMethod
 *               - tableId
 *               - orderProducts
 *     responses:
 *       200:
 *         description: Successfully created order
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
 *                     customerName:
 *                       type: string
 *                       description: The name of the customer
 *                       example: John Doe
 *                     paymentMethod:
 *                       type: string
 *                       description: The payment method used
 *                       example: Credit Card
 *                     table:
 *                       type: string
 *                       description: The name of the table where the order was placed
 *                       example: MEJA NO 1
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             description: The category of the product
 *                             example: Minuman
 *                           name:
 *                             type: string
 *                             description: The name of the product
 *                             example: Jeruk
 *                           variant:
 *                             type: string
 *                             nullable: true
 *                             description: The variant of the product
 *                             example: DINGIN
 *                           price:
 *                             type: integer
 *                             description: The price of the product
 *                             example: 12000
 *                           quantity:
 *                             type: integer
 *                             description: The quantity of the product
 *                             example: 1
 *                           total:
 *                             type: integer
 *                             description: The total cost for this product
 *                             example: 12000
 *                       description: List of products included in the order
 *                       example:
 *                         - category: Minuman
 *                           name: Jeruk
 *                           variant: DINGIN
 *                           price: 12000
 *                           quantity: 1
 *                           total: 12000
 *                         - category: Minuman
 *                           name: Kopi
 *                           variant: PANAS
 *                           price: 6000
 *                           quantity: 1
 *                           total: 6000
 *                         - category: Promo
 *                           name: Nasi Goreng + Jeruk Dingin
 *                           variant: null
 *                           price: 23000
 *                           quantity: 2
 *                           total: 46000
 *                         - category: Minuman
 *                           name: Teh
 *                           variant: MANIS
 *                           price: 8000
 *                           quantity: 1
 *                           total: 8000
 *                         - category: Makanan
 *                           name: Mie
 *                           variant: GORENG
 *                           price: 15000
 *                           quantity: 1
 *                           total: 15000
 *                     printers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the printer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             description: The name of the printer
 *                             example: Printer Bar
 *                       description: List of printers associated with the order
 *                       example:
 *                         - id: 3
 *                           name: Printer Bar
 *                         - id: 1
 *                           name: Printer Kasir
 *                         - id: 2
 *                           name: Printer Dapur
 *                     grandTotal:
 *                       type: integer
 *                       description: The total amount of the order
 *                       example: 87000
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the order
 *                       example: 2024-08-08T00:03:53Z
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Table not found
 */
orderRoute.post("/orders", (req, res) => {
  OrderController.create(req, res);
});

module.exports = orderRoute;
