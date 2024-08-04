const express = require("express");
const productItemRoute = express.Router();
const ProductItemController = require("../controllers/productItem");

/**
 * @swagger
 * /api/product/items:
 *   get:
 *     summary: Get List Product Items
 *     description: To get a list of all product items
 *     tags:
 *       - Product Items
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
 *                       productCategoryId:
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
 *       400:
 *         description: Failed Invalid message
 */
productItemRoute.get("/product/items", (req, res) => {
  ProductItemController.findAll(req, res);
});

/**
 * @swagger
 * /api/product/items/{id}:
 *   get:
 *     summary: Get Info Product Item
 *     description: To get a list of one Product Item based on id
 *     tags:
 *       - Product Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product item ID
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
 *                       example: Jeruk
 *                     productCategoryId:
 *                       type: integer
 *                       example: 1
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
 *         description: Failed Product Item not found
 */
productItemRoute.get("/product/items/:id", (req, res) => {
  ProductItemController.findOne(req, res);
});

module.exports = productItemRoute;
