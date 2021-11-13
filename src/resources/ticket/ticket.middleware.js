import { create_ticket_schema } from './ticket.validation';
import { request_response } from '../../utils/api.response';
import { Event } from '../event/event.model';

export const validate_ticket_request = async (req, response, next) => {
  try {
    const value = await create_ticket_schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (error) {
    return request_response({
      response,
      status_code: 422,
      message: error.details[0].message,
    });
  }
};

export const check_if_event_exists = async (req, response, next) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return request_response({
        response,
        status_code: 404,
        message: 'Event not found',
      });
    }
    return next();
  } catch (error) {
    return request_response({
      response,
    });
  }
};
