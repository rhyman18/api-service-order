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

module.exports = productVariantRoute;
