const Joi = require("joi");

const printerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
});

const tableSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
});

const productCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
});

const productItemSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 character long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  productCategoryId: Joi.number().required().messages({
    "number.base": "Product Category Id must be an integer",
    "number.empty": "Product Category Id cannot be empty",
    "any.required": "Product Category is required",
  }),
});

const productVariantSchema = {
  create() {
    return Joi.object({
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
  },

  update() {
    return Joi.object({
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
  },

  createWithout() {
    return Joi.object({
      price: Joi.number().precision(2).required().messages({
        "number.base": "Price must be a float",
        "any.required": "Price is required",
      }),
      productItemId: Joi.number().integer().required().messages({
        "number.base": "Product Item Id must be an integer",
        "any.required": "Product Item Id is required",
      }),
    });
  },

  without() {
    return Joi.object({
      price: Joi.number().precision(2).required().messages({
        "number.base": "Price must be a float",
        "any.required": "Price is required",
      }),
    });
  },
};

module.exports = {
  printerSchema,
  tableSchema,
  productCategorySchema,
  productItemSchema,
  productVariantSchema,
};
