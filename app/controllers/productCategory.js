const responseJson = require("../utils/response");
const { productCategorySchema } = require("../utils/validate");
const db = require("../models");
const ProductCategory = db.productCategory;

const ProductCategoryController = {
  async findAll(req, res) {
    try {
      const getProductCategories = await ProductCategory.findAll();

      if (!getProductCategories.length) {
        return responseJson(res, 400, "Failed: Product categories is empty");
      }

      return responseJson(res, 200, "Success", getProductCategories);
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
      const { error } = productCategorySchema.validate(req.body);

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
      const { error } = productCategorySchema.validate(req.body);

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

  async destroy(req, res) {
    try {
      const deleteProductCategory = await ProductCategory.destroy({
        where: { id: req.params.id },
      });

      if (!deleteProductCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductCategoryController;
