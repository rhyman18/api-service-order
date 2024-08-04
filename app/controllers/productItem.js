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

  async findOne(req, res) {
    try {
      const getProductItem = await ProductItem.findOne({
        where: { id: req.params.id },
        include: [{ model: db.productCategory }],
      });

      if (!getProductItem) {
        return responseJson(res, 404, "Failed: Product item not found");
      }

      return responseJson(res, 200, "Success", getProductItem);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductItemController;
