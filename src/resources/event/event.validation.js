import Joi from "joi";

export const create_event_schema = Joi.object({
  name: Joi.string().required(),
  virtual: Joi.boolean().required(),
  location: Joi.string().when("virtual", { is: false, then: Joi.required() }),
  date: Joi.date().required(),
  time: Joi.number().required(),
  active: Joi.boolean(),
  free: Joi.boolean().required(),
  description: Joi.string(),
});

export const update_event_schema = Joi.object({
  name: Joi.string(),
  virtual: Joi.boolean(),
  location: Joi.string().when("virtual", { is: false, then: Joi.required() }),
  date: Joi.date(),
  time: Joi.number(),
  active: Joi.boolean(),
  free: Joi.boolean(),
  description: Joi.string(),
});
