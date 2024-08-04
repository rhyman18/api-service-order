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

/**
 * @swagger
 * /api/product/category:
 *   post:
 *     summary: Add Product Category
 *     description: Create a new product category
 *     tags:
 *       - Product Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product category
 *                 example: Minuman
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully created product category
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
 */
productCategoryRoute.post("/product/category", (req, res) => {
  ProductCategoryController.create(req, res);
});

/**
 * @swagger
 * /api/product/category/{id}:
 *   put:
 *     summary: Update Product Category
 *     description: Update an existing product category
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product category
 *                 example: Minuman
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successfully updated product category
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
 *         description: Failed Product Category not found
 */
productCategoryRoute.put("/product/category/:id", (req, res) => {
  ProductCategoryController.update(req, res);
});

module.exports = productCategoryRoute;
