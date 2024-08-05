const responseJson = require("../utils/response");
const db = require("../models");
const ProductVariant = db.productVariant;
const ProductItem = db.productItem;

const ProductVariantController = {
  async findAll(req, res) {
    try {
      const getProductVariants = await ProductVariant.findAll({
        include: [{ model: ProductItem }],
      });

      if (!getProductVariants.length) {
        return responseJson(res, 400, "Failed: Product variants is empty");
      }

      return responseJson(res, 200, "Success", getProductVariants);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const getProductVariant = await ProductVariant.findOne({
        where: { id: req.params.id },
        include: [{ model: ProductItem }],
      });

      if (!getProductVariant) {
        return responseJson(res, 404, "Failed: Product variant not found");
      }

      return responseJson(res, 200, "Success", getProductVariant);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductVariantController;
