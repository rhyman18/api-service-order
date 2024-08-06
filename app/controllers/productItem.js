const responseJson = require("../utils/response");
const { productItemSchema } = require("../utils/validate");
const db = require("../models");
const ProductItem = db.productItem;
const ProductCategory = db.productCategory;

const ProductItemController = {
  async findAll(req, res) {
    try {
      const getProductItems = await ProductItem.findAll({
        include: [{ model: ProductCategory }],
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
        include: [{ model: ProductCategory }],
      });

      if (!getProductItem) {
        return responseJson(res, 404, "Failed: Product item not found");
      }

      return responseJson(res, 200, "Success", getProductItem);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const { error } = productItemSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, productCategoryId } = req.body;

      const productCategory = await ProductCategory.findByPk(productCategoryId);
      if (!productCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      const createProductItem = await ProductItem.create({
        name,
        productCategoryId,
      });

      return responseJson(res, 200, "Success", createProductItem);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = productItemSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, productCategoryId } = req.body;

      const productCategory = await ProductCategory.findByPk(productCategoryId);
      if (!productCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      const updateProductItem = await ProductItem.update(
        {
          name,
          productCategoryId,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updateProductItem[0] === 0) {
        return responseJson(res, 404, "Failed: Product item not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const deleteProductItem = await ProductItem.destroy({
        where: { id: req.params.id },
      });

      if (!deleteProductItem) {
        return responseJson(res, 404, "Failed: Product Item not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductItemController;
