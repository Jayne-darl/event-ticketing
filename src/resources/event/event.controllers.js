import { request_response } from "../../utils/api.response";
import { Event } from "./event.model";

export class eventController {
  static async createEvent(req, response) {
    try {
      if (new Date(req.body.time).getTime() < new Date().getTime()) {
        return request_response({
          response,
          status_code: 422,
          message: "The time is in the past",
        });
      }
      const event = new Event({ ...req.body, createdBy: req.user._id });

      await event.save();
      return request_response({
        response,
        status_code: 201,
        message: "Event Created",
        data: event,
      });
    } catch (error) {
      return request_response({ response });
    }
  }
  static async getAllEvent(req, response) {
    try {
      const events = await Event.find({});
      return request_response({
        response,
        status_code: 200,
        message: "Ok",
        data: events,
      });
    } catch (error) {
      return request_response({ response });
    }
  }
  static async getMyEvent(req, response) {
    try {
      const events = await Event.find({ createdBy: req.user._id });
      return request_response({
        response,
        status_code: 200,
        message: "OK",
        data: events,
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
          message: "No event found",
        });
      }
      const updated_event = await Event.findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      );
      return request_response({
        response,
        status_code: 200,
        message: "Event updated",
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
          message: "No event found",
        });
      }

      return request_response({
        response,
        status_code: 200,
        message: "Event removed",
        data: event,
      });
    } catch (error) {
      return request_response({ response });
    }
  }
}
