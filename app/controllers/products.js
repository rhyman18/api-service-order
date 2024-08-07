const responseJson = require("../utils/response");
const db = require("../models");
const ProductItem = db.productItem;
const ProductCategory = db.productCategory;
const ProductVariant = db.productVariant;

const ProductController = {
  async findAll(req, res) {
    try {
      const getProducts = await ProductItem.findAll({
        include: [
          { model: ProductCategory },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProducts.length) {
        return responseJson(res, 400, "Failed: Products is empty");
      }

      return responseJson(res, 200, "Success", getProducts);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByCategory(req, res) {
    try {
      const getProducts = await ProductItem.findAll({
        include: [
          { model: ProductCategory, where: { name: req.params.category } },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProducts.length) {
        return responseJson(res, 404, "Failed: Product/Category not found");
      }

      return responseJson(res, 200, "Success", getProducts);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const getProduct = await ProductItem.findOne({
        where: { id: req.params.id },
        include: [
          { model: ProductCategory },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProduct) {
        return responseJson(res, 400, "Failed: Product not found");
      }

      return responseJson(res, 200, "Success", getProduct);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductController;
