const responseJson = require("../utils/response");
const db = require("../models");
const ProductCategory = db.productCategory;

const ProductCategoryController = {
  async findAll(req, res) {
    try {
      const getProductCategory = await ProductCategory.findAll();

      if (!getProductCategory.length) {
        return responseJson(res, 400, "Failed: Product categories is empty");
      }

      return responseJson(res, 200, "Success", getProductCategory);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductCategoryController;
