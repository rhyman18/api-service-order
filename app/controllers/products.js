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
      const getCategory = await ProductCategory.findOne({
        where: { name: req.params.category },
      });

      if (!getCategory) {
        return responseJson(res, 400, "Failed: Products category not found");
      }

      const getProducts = await ProductItem.findAll({
        where: { productCategoryId: getCategory.id },
        include: [
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
};

module.exports = ProductController;
