const responseJson = require("../utils/response");
const { productVariantSchema } = require("../utils/validate");
const db = require("../models");
const sequelize = db.sequelize;
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

  async bulkCreate(req, res) {
    const t = await sequelize.transaction();

    try {
      const { error } = productVariantSchema.create().validate(req.body);

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
      const { error } = productVariantSchema.update().validate(req.body);

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
      const { error } = productVariantSchema.createWithout().validate(req.body);

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
      const { error } = productVariantSchema.without().validate(req.body);

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
