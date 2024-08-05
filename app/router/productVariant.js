const express = require("express");
const productVariantRoute = express.Router();
const ProductVariantController = require("../controllers/productVariant");

/**
 * @swagger
 * /api/product/variants:
 *   get:
 *     summary: Get List Product Variants
 *     description: To get a list of all product variants
 *     tags:
 *       - Product Variants
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
 *                         example: DINGIN
 *                       price:
 *                         type: float
 *                         example: 12000
 *                       productItemId:
 *                         type: integer
 *                         example: 1
 *                       productItem:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Jeruk
 *                           productCategoryId:
 *                             type: integer
 *                             example: 1
 *       400:
 *         description: Failed Invalid message
 */
productVariantRoute.get("/product/variants", (req, res) => {
  ProductVariantController.findAll(req, res);
});

/**
 * @swagger
 * /api/product/variants/{id}:
 *   get:
 *     summary: Get Info Product Variant
 *     description: To get a list of one Product Variant based on id
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product variant ID
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
 *                       example: DINGIN
 *                     price:
 *                       type: float
 *                       example: 12000
 *                     productItemId:
 *                       type: integer
 *                       example: 1
 *                     productItem:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Jeruk
 *                         productCategoryId:
 *                           type: integer
 *                           example: 1
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Product Variant not found
 */
productVariantRoute.get("/product/variants/:id", (req, res) => {
  ProductVariantController.findOne(req, res);
});

/**
 * @swagger
 * /api/product/variants:
 *   post:
 *     summary: Add Product Variants
 *     description: Create new product variants
 *     tags:
 *       - Product Variants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productItemId:
 *                 type: integer
 *                 description: The ID of the product item
 *                 example: 1
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the product variant
 *                       example: DINGIN
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the product variant
 *                       example: 12000
 *             required:
 *               - productItemId
 *               - variants
 *     responses:
 *       200:
 *         description: Successfully created product variants
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
 *                         example: DINGIN
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 12000
 *                       productItemId:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Failed Invalid message
 *       404:
 *         description: Failed Product Item not found
 */
productVariantRoute.post("/product/variants", (req, res) => {
  ProductVariantController.bulkCreate(req, res);
});

/**
 * @swagger
 * /api/product/variants/{id}:
 *   put:
 *     summary: Update Product Variant
 *     description: Update an existing product variant
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product variant
 *                 example: DINGIN
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product variant
 *                 example: 12000
 *               productItemId:
 *                 type: integer
 *                 description: The ID of the product item
 *                 example: 1
 *             required:
 *               - name
 *               - price
 *               - productItemId
 *     responses:
 *       200:
 *         description: Successfully updated product variant
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
 *         description: Failed Product Variant/Item not found
 */
productVariantRoute.put("/product/variants/:id", (req, res) => {
  ProductVariantController.update(req, res);
});

/**
 * @swagger
 * /api/product/variants/{id}:
 *   delete:
 *     summary: Delete Product Variant
 *     description: Delete an existing product variant
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product variant ID
 *     responses:
 *       200:
 *         description: Successfully deleted product variant
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
 *         description: Failed Product Variant not found
 */
productVariantRoute.delete("/product/variants/:id", (req, res) => {
  ProductVariantController.destroy(req, res);
});

module.exports = productVariantRoute;
