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

module.exports = {
  printerSchema,
  tableSchema,
};
