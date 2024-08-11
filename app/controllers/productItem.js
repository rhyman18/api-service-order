const responseJson = require("../utils/response");
const responseJsonV2 = require("../utils/responseV2");
const { productItemSchema } = require("../utils/validate");
const db = require("../models");
const ProductItem = db.productItem;
const ProductCategory = db.productCategory;
const redisCache = require("../middleware/redisCache");

const ProductItemController = {
  async findAll(req, res) {
    try {
      const cacheKey = "productItems:all";
      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProductItems = await ProductItem.findAll({
        include: [{ model: ProductCategory }],
      });

      if (!getProductItems.length) {
        return responseJson(res, 400, "Failed: Product items is empty");
      }

      const response = { message: "Success", data: getProductItems };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `productItems:${id}`;

      const cachedData = await redisCache.get(cacheKey);
      if (cachedData) {
        return responseJsonV2(res, 200, JSON.parse(cachedData));
      }

      const getProductItem = await ProductItem.findOne({
        where: { id },
        include: [{ model: ProductCategory }],
      });

      if (!getProductItem) {
        return responseJson(res, 404, "Failed: Product item not found");
      }

      const response = { message: "Success", data: getProductItem };
      await redisCache.set(cacheKey, response);

      return responseJsonV2(res, 200, response);
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

      const cacheKey = `productItems:${createProductItem.id}`;
      const response = { message: "Success", data: createProductItem };
      await redisCache.set(cacheKey, response);

      const productsKey = await redisCache.keys("products:*");
      const keys = ["productItems:all", ...productsKey];
      await redisCache.del(keys);

      return responseJsonV2(res, 200, response);
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

      const id = req.params.id;
      const cacheKey = `productItems:${id}`;

      const updateProductItem = await ProductItem.update(
        {
          name,
          productCategoryId,
        },
        {
          where: { id },
        }
      );

      if (updateProductItem[0] === 0) {
        return responseJson(
          res,
          404,
          "Failed: No change detected or Product item not found"
        );
      }

      const productVariantsKey = await redisCache.keys("productVariants:*");
      const productsKey = await redisCache.keys("products:*");
      const keys = [
        cacheKey,
        "productItems:all",
        ...productVariantsKey,
        ...productsKey,
      ];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const cacheKey = `productItems:${id}`;

      const deleteProductItem = await ProductItem.destroy({
        where: { id },
      });

      if (!deleteProductItem) {
        return responseJson(res, 404, "Failed: Product Item not found");
      }

      const productVariantsKey = await redisCache.keys("productVariants:*");
      const productsKey = await redisCache.keys("products:*");
      const keys = [
        cacheKey,
        "productItems:all",
        ...productVariantsKey,
        ...productsKey,
      ];
      await redisCache.del(keys);

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductItemController;
