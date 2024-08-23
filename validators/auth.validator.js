// validation.js
const Joi = require("joi");

// Joi schema for user registration
const userRegistrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Joi schema for user login
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Joi schema for forgot password
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
    forgotPasswordSchema


}