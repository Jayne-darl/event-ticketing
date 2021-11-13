import Joi from 'joi';

const dateTime = Joi.object().keys({ eventDate: Joi.date().required(), eventStartTime: Joi.number().required(), eventEndTime: Joi.number().required() });

export const create_event_schema = Joi.object({
  name: Joi.string().required(),
  virtual: Joi.boolean().required(),
  location: Joi.string().when('virtual', { is: false, then: Joi.required() }),
  eventDateTime: Joi.array().items(dateTime).required(),
  price: Joi.number().positive(),
  description: Joi.string(),
});

export const update_event_schema = Joi.object({
  name: Joi.string(),
  virtual: Joi.boolean(),
  location: Joi.string().when('virtual', { is: false, then: Joi.required() }),
  date: Joi.date(),
  time: Joi.number(),
  active: Joi.boolean(),
  free: Joi.boolean(),
  price: Joi.number().when('free', { is: false, then: Joi.required() }),
  description: Joi.string(),
});
