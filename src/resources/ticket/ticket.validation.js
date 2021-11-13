import Joi from 'joi';

export const create_ticket_schema = Joi.object({
  eventId: Joi.string().required(),
});
