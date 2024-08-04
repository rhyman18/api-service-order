const express = require("express");
const productCategoryRoute = express.Router();
const ProductCategoryController = require("../controllers/productCategory");

/**
 * @swagger
 * /api/product/categories:
 *   get:
 *     summary: Get List Product Categories
 *     description: To get a list of all product categories
 *     tags:
 *       - Product Categories
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
 *                         example: Minuman
 *       400:
 *         description: Failed Invalid message
 */
productCategoryRoute.get("/product/categories", (req, res) => {
  ProductCategoryController.findAll(req, res);
});

module.exports = productCategoryRoute;
