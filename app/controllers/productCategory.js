const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const { productCategorySchema } = require("../utils/validate");
const db = require("../models");
const ProductCategory = db.productCategory;
const redisCache = require("../middleware/redisCache");

const ProductCategoryController = {
  async findAll(req, res) {
    try {
      const cacheKey = "productCategories:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProductCategories = await ProductCategory.findAll();

      if (!getProductCategories.length) {
        return responseJson(res, 400, "Failed: Product categories is empty");
      }

      const response = { message: "Success", data: getProductCategories };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `productCategories:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProductCategory = await ProductCategory.findOne({
        where: { id },
      });

      if (!getProductCategory) {
        return responseJson(res, 404, "Failed: Product category not found");
      }

      const response = { message: "Success", data: getProductCategory };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
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

      const cacheKey = `productCategories:${createProductCategory.id}`;
      const response = { message: "Success", data: createProductCategory };
      await redisCache.set(cacheKey, response);
      await redisCache.del("productCategories:all");

      return responseJsonV2(res, 200, response);
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

      const id = req.params.id;
      const cacheKey = `productCategories:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const updateProductCategory = await ProductCategory.update(
        {
          name: req.body.name,
        },
        {
          where: { id },
        }
      );

      if (updateProductCategory[0] === 0) {
        return responseJson(
          res,
          404,
          "Failed: No change detected or Product category not found"
        );
      }

      const keys = [cacheKey, "productCategories:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `productCategories:${id}`;

      const deleteProductCategory = await ProductCategory.destroy({
        where: { id },
      });

      if (!deleteProductCategory) {
        return responseJson(res, 404, "Failed: Product Category not found");
      }

      const keys = [cacheKey, "productCategories:all"];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductCategoryController;
