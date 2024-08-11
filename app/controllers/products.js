const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const db = require("../models");
const ProductItem = db.productItem;
const ProductCategory = db.productCategory;
const ProductVariant = db.productVariant;
const redisCache = require("../middleware/redisCache");

const ProductController = {
  async findAll(req, res) {
    try {
      const cacheKey = "products:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProducts = await ProductItem.findAll({
        include: [
          { model: ProductCategory },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProducts.length) {
        return responseJson(res, 400, "Failed: Products is empty");
      }

      const response = { message: "Success", data: getProducts };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findByCategory(req, res) {
    try {
      const name = req.params.category;
      const cacheKey = `products:findByCategory:${name}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProducts = await ProductItem.findAll({
        include: [
          { model: ProductCategory, where: { name } },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProducts.length) {
        return responseJson(res, 404, "Failed: Product/Category not found");
      }

      const response = { message: "Success", data: getProducts };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `products:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProduct = await ProductItem.findOne({
        where: { id },
        include: [
          { model: ProductCategory },
          { model: ProductVariant, attributes: { exclude: ["productItemId"] } },
        ],
        attributes: { exclude: ["productCategoryId"] },
      });

      if (!getProduct) {
        return responseJson(res, 400, "Failed: Product not found");
      }

      const response = { message: "Success", data: getProduct };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductController;
