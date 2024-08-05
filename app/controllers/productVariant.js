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

      const productItem = await ProductItem.findByPk(productItemId);
      if (!productItem) {
        t.rollback();
        return responseJson(res, 404, "Failed: Product Item not found");
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
};

module.exports = ProductVariantController;
