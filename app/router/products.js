const express = require("express");
const productRoute = express.Router();
const ProductController = require("../controllers/products");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get List Products
 *     description: To get a list of all products
 *     tags:
 *       - Products
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
 *                         example: Jeruk
 *                       productCategory:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Minuman
 *                       productVariants:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: DINGIN
 *                             price:
 *                               type: integer
 *                               example: 12000
 *       400:
 *         description: Failed Invalid message
 */
productRoute.get("/products", (req, res) => {
  ProductController.findAll(req, res);
});

/**
 * @swagger
 * /api/products/{category}:
 *   get:
 *     summary: Get List Products by Category
 *     description: To get a list of all products by category
 *     tags:
 *       - Products
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product category name
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
 *                         example: 5
 *                       name:
 *                         type: string
 *                         example: Mie
 *                       productVariants:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 8
 *                             name:
 *                               type: string
 *                               example: GORENG
 *                             price:
 *                               type: integer
 *                               example: 15000
 *       400:
 *         description: Failed Invalid message
 */
productRoute.get("/products/:category", (req, res) => {
  ProductController.findByCategory(req, res);
});

module.exports = productRoute;
