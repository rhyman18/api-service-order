const responseJson = require("../utils/response");
const Joi = require("joi");
const db = require("../models");
const ProductCategory = db.productCategory;

const createProductCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
});

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

  async findOne(req, res) {
    try {
      const getProductCategory = await ProductCategory.findOne({
        where: { id: req.params.id },
      });

      if (!getProductCategory) {
        return responseJson(res, 404, "Failed: Product category not found");
      }

      return responseJson(res, 200, "Success", getProductCategory);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    try {
      const { error } = createProductCategorySchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const createProductCategory = await ProductCategory.create({
        name: req.body.name,
      });

      return responseJson(res, 200, "Success", createProductCategory);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = createProductCategorySchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const updateProductCategory = await ProductCategory.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updateProductCategory[0] === 0) {
        return responseJson(res, 404, "Failed: Product category not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductCategoryController;
