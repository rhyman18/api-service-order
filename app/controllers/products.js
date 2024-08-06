const responseJson = require("../utils/response");
const db = require("../models");
const ProductItem = db.productItem;
const ProductCategory = db.productCategory;
const ProductVariant = db.productVariant;

const ProductController = {
  async findAll(req, res) {
    try {
      const gettProducts = await ProductItem.findAll({
        include: [
          { model: ProductCategory },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!gettProducts.length) {
        return responseJson(res, 400, "Failed: Products is empty");
      }

      return responseJson(res, 200, "Success", gettProducts);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductController;
