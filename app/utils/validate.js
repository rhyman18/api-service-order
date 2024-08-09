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
              "string.min": "Name must be at least 3 character long",
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
        "string.min": "Name must be at least 3 character long",
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

const printerJobSchema = Joi.object({
  printerId: Joi.number().required().messages({
    "number.base": "Printer Id must be an integer",
    "number.empty": "Printer Id cannot be empty",
    "any.required": "Printer is required",
  }),
  productCategoryId: Joi.number().required().messages({
    "number.base": "Product Category Id must be an integer",
    "number.empty": "Product Category Id cannot be empty",
    "any.required": "Product Category is required",
  }),
});

const orderSchema = Joi.object({
  customerName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Customer Name must be a string",
    "string.empty": "Customer Name cannot be empty",
    "string.min": "Customer Name must be at least 3 characters long",
    "string.max": "Customer Name must be at most 50 characters long",
    "any.required": "Customer Name is required",
  }),
  paymentMethod: Joi.string().min(3).max(50).required().messages({
    "string.base": "Payment Method must be a string",
    "string.empty": "Payment Method cannot be empty",
    "string.min": "Payment Method must be at least 3 characters long",
    "string.max": "Payment Method must be at most 50 characters long",
    "any.required": "Payment Method is required",
  }),
  tableId: Joi.number().integer().required().messages({
    "number.base": "Table ID must be an integer",
    "number.empty": "Table ID cannot be empty",
    "any.required": "Table ID is required",
  }),
  orderProducts: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required().messages({
          "number.base": "Product ID must be an integer",
          "any.required": "Product ID is required",
        }),
        qty: Joi.number().integer().positive().required().messages({
          "number.base": "Quantity must be an integer",
          "number.positive": "Quantity must be a positive number",
          "any.required": "Quantity is required",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Order Products must be an array",
      "array.empty": "Order Products cannot be empty",
      "any.required": "Order Products are required",
    }),
});

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of 3",
    "string.max": "Name should have a maximum length of 30",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password is required",
    "string.min": "Password should have a minimum length of 6",
    "any.required": "Password is required",
  }),
});

module.exports = {
  printerSchema,
  tableSchema,
  productCategorySchema,
  productItemSchema,
  productVariantSchema,
  printerJobSchema,
  orderSchema,
  signUpSchema,
};
