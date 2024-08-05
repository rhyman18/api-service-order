const responseJson = require("../utils/response");
const Joi = require("joi");
const db = require("../models");
const sequelize = db.sequelize;
const ProductVariant = db.productVariant;
const ProductItem = db.productItem;

const createProductVariantSchema = Joi.object({
  productItemId: Joi.number().integer().required().messages({
    "number.base": "Product Item Id must be an integer",
    "any.required": "Product Item Id is required",
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
          "string.base": "Name must be a string",
          "string.empty": "Name cannot be empty",
          "string.min": "Name must be at least 1 character long",
          "string.max": "Name must be at most 50 characters long",
          "any.required": "Name is required",
        }),
        price: Joi.number().precision(2).required().messages({
          "number.base": "Price must be a float",
          "any.required": "Price is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Variants must be an array",
      "array.min": "Variants array cannot be empty",
      "any.required": "Variants are required",
    }),
});

const updateProductVariantSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  price: Joi.number().precision(2).required().messages({
    "number.base": "Price must be a float",
    "any.required": "Price is required",
  }),
});

const createWithoutProductVariantSchema = Joi.object({
  price: Joi.number().precision(2).required().messages({
    "number.base": "Price must be a float",
    "any.required": "Price is required",
  }),
  productItemId: Joi.number().integer().required().messages({
    "number.base": "Product Item Id must be an integer",
    "any.required": "Product Item Id is required",
  }),
});

const withoutProductVariantSchema = Joi.object({
  price: Joi.number().precision(2).required().messages({
    "number.base": "Price must be a float",
    "any.required": "Price is required",
  }),
});

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

  async bulkCreate(req, res) {
    const t = await sequelize.transaction();

    try {
      const { error } = createProductVariantSchema.validate(req.body);

      if (error) {
        t.rollback();
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { productItemId, variants } = req.body;

      const productItem = await ProductItem.findOne({
        where: { id: productItemId },
        include: [{ model: ProductVariant }],
        transaction: t,
      });

      const checkProductVariant = productItem?.productVariants[0]?.name;

      if (!productItem) {
        await t.rollback();
        return responseJson(res, 404, "Failed: Product Item not found");
      } else if (checkProductVariant === null) {
        await t.rollback();
        return responseJson(res, 404, "Failed: Wrong Product variants");
      }

      const productVariantsData = variants.map((variant) => ({
        ...variant,
        productItemId,
      }));

      const createProductVariants = await ProductVariant.bulkCreate(
        productVariantsData,
        { transaction: t }
      );

      await t.commit();

      return responseJson(res, 200, "Success", createProductVariants);
    } catch (error) {
      await t.rollback();
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async update(req, res) {
    try {
      const { error } = updateProductVariantSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, price } = req.body;

      const updateProductVariant = await ProductVariant.update(
        {
          name,
          price,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updateProductVariant[0] === 0) {
        return responseJson(res, 404, "Failed: Product variant not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const deleteProductVariant = await ProductVariant.destroy({
        where: { id: req.params.id },
      });

      if (!deleteProductVariant) {
        return responseJson(res, 404, "Failed: Product Variant not found");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },

  async create(req, res) {
    const t = await sequelize.transaction();

    try {
      const { error } = createWithoutProductVariantSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { price, productItemId } = req.body;

      const productItem = await ProductItem.findOne({
        where: { id: productItemId },
        transaction: t,
      });

      if (!productItem) {
        await t.rollback();
        return responseJson(res, 404, "Failed: Product Item not found");
      }

      const existingVariants = await ProductVariant.findOne({
        where: { productItemId },
        transaction: t,
      });

      if (existingVariants) {
        await t.rollback();
        return responseJson(
          res,
          400,
          "Failed: Product Item already has variants"
        );
      }

      const createWithoutProductVariant = await ProductVariant.create(
        {
          name: null,
          price,
          productItemId,
        },
        { transaction: t }
      );

      await t.commit();

      return responseJson(res, 200, "Success", createWithoutProductVariant);
    } catch (error) {
      await t.rollback();
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async updateWithoutVariant(req, res) {
    try {
      const { error } = withoutProductVariantSchema.validate(req.body);

      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const checkWithoutVariant = await ProductVariant.findByPk(req.params.id);

      if (!checkWithoutVariant) {
        return responseJson(res, 404, "Failed: Product variant not found");
      }

      if (checkWithoutVariant.name !== null) {
        return responseJson(res, 400, "Failed: Wrong Product without variants");
      }

      const updateProductVariant = await ProductVariant.update(
        {
          price: req.body.price,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updateProductVariant[0] === 0) {
        return responseJson(res, 404, "Failed: Update Product without variant");
      }

      return responseJson(res, 200, "Success");
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = ProductVariantController;
