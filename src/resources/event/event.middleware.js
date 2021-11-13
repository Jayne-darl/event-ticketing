import dayjs from 'dayjs';
import { create_event_schema, update_event_schema } from './event.validation';
import { request_response } from '../../utils/api.response';

export const validate_create_event_formdata = async (req, response, next) => {
  try {
    const value = await create_event_schema.validateAsync(req.body);
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
export const validate_update_event_formdata = async (req, response, next) => {
  try {
    const value = await update_event_schema.validateAsync(req.body);
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

/**
 * This is used to comapare eventStartTime and the eventEndTime. This is to ensure that the startTime is earlier than the endtime and that the eventDate is not in the past
 */
export const is_valid_event_time = async (req, response, next) => {
  try {
    const { eventDateTime } = req.body;
    // This used for creating and updating an event. In updating an event the user may no supply the eventDateTime and my validator does not allow, null or empty objects. This is for update Event handler case in the event the user did not update the event time, so it just goes to the next middleware or controller
    if (!eventDateTime) return next();
    const valid_event_time = eventDateTime.every(({ eventStartTime, eventEndTime }) => {
      if (eventStartTime < eventEndTime) {
        return true;
      }
      return false;
    });
    const invalid_event_date = eventDateTime.every(({ eventDate }) => {
      if (dayjs(eventDate).isBefore(dayjs(), 'day')) {
        return true;
      }
      return false;
    });
    if (invalid_event_date) {
      return request_response({
        response,
        status_code: 422,
        message: 'Event date is in the past',
      });
    }
    if (!valid_event_time) {
      return request_response({
        response,
        status_code: 422,
        message: 'End time should not be earlier than start time',
      });
    }
    return next();
  } catch (error) {
    return request_response({ response });
  }
};
