import Joi from "joi";

export const commentValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  content: Joi.string().min(1).required(),
});
