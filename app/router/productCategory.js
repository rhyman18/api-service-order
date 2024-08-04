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

/**
 * @swagger
 * /api/product/category/{id}:
 *   get:
 *     summary: Get Info Product Category
 *     description: To get a list of one Product Category based on id
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product category ID
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
 *                       example: Minuman
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Product Category not found
 */
productCategoryRoute.get("/product/category/:id", (req, res) => {
  ProductCategoryController.findOne(req, res);
});

module.exports = productCategoryRoute;
