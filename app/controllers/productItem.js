const responseJson = require("../utils/response");
const Joi = require("joi");
const db = require("../models");
const ProductItem = db.productItem;

const createProductItemSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  productCategoryId: Joi.number().required().messages({
    "number.base": "Product Category Id must be an integer",
    "number.empty": "Product Category Id cannot be empty",
    "any.required": "Product Category is required",
  }),
});

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

  async create(req, res) {
    try {
      const { error } = createProductItemSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, productCategoryId } = req.body;

      const productCategory = await db.productCategory.findByPk(
        productCategoryId
      );
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
      const { error } = createProductItemSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, productCategoryId } = req.body;

      const productCategory = await db.productCategory.findByPk(
        productCategoryId
      );
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
