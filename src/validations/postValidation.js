import Joi from "joi";

// Joi validation schema
export const postValidationSchema = Joi.object({
  title: Joi.string().min(10).required(), 
  content: Joi.string().min(10).required(),
  category: Joi.string()
    .valid("Health", "Religion", "Fashion", "Finance")
    .required(),
});
