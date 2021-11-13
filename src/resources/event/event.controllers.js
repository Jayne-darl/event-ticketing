import { request_response } from '../../utils/api.response';
import { Event } from './event.model';

/**
 * This toggles active for event dates. It turns active to true when the event
 * starts and back to false when the event ends.
 */
const getEventStatus = (eventDateTime) => {
  const now = Date.now();
  const is_active = eventDateTime.some(({ eventStartTime, eventEndTime }) => {
    if (now >= eventStartTime && now < eventEndTime) {
      return true;
    }
    return false;
  });
  return is_active;
};
export class eventController {
  static async createEvent(req, response) {
    try {
      const event = new Event({ ...req.body, createdBy: req.user._id });

      await event.save();
      return request_response({
        response,
        status_code: 201,
        message: 'Event Created',
        data: event,
      });
    } catch (error) {
      return request_response({ response });
    }
  }

  static async getAllEvents(req, response) {
    try {
      const events = await Event.find({}).sort({ createdAt: -1 });
      const data = events.map((event) => ({ ...event._doc, active: getEventStatus(event.eventDateTime) }));
      return request_response({
        response,
        status_code: 200,
        message: 'Ok',
        data,
      });
    } catch (error) {
      return request_response({ response });
    }
  }

  static async getMyEvents(req, response) {
    try {
      const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
      const data = events.map((event) => ({ ...event._doc, active: getEventStatus(event.eventDateTime) }));
      return request_response({
        response,
        status_code: 200,
        message: 'OK',
        data,
      });
    } catch (error) {
      return request_response({ response });
    }
  }

  static async updateEvent(req, response) {
    try {
      const event_doc = await Event.findOne({
        createdBy: req.user._id,
        _id: req.params.id,
      });

      if (!event_doc) {
        return request_response({
          response,
          status_code: 404,
          message: 'No event found',
        });
      }
      const updated_event = await Event.findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true },
      );
      return request_response({
        response,
        status_code: 200,
        message: 'Event updated',
        data: updated_event,
      });
    } catch (error) {
      return request_response({ response });
    }
  }

  static async deleteEvent(req, response) {
    try {
      const event = await Event.findOneAndRemove({
        createdBy: req.user._id,
        _id: req.params.id,
      });

      if (!event) {
        return request_response({
          response,
          status_code: 404,
          message: 'No event found',
        });
      }

      return request_response({
        response,
        status_code: 200,
        message: 'Event removed',
        data: event,
      });
    } catch (error) {
      return request_response({ response });
    }
  }
}
