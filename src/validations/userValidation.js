import Joi from "joi";

export const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  country: Joi.string().required(),
  password: Joi.string().required().min(10).max(30),
  role: Joi.string().valid("user", "admin"),
});

// export const loginUserSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });
