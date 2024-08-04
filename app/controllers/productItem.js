const responseJson = require("../utils/response");
const db = require("../models");
const ProductItem = db.productItem;

const ProductItemController = {
  async findAll(req, res) {
    try {
      const getProductItems = await ProductItem.findAll({
        include: [{ model: db.productCategory }],
      });

      if (!getProductItems.length) {
        return responseJson(res, 400, "Failed: Product items is empty");
      }

      return responseJson(res, 200, "Success", getProductItems);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductItemController;
