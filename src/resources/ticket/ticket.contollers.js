import { request_response } from "../../utils/api.response";
import { Ticket } from "./ticket.model";

export class ticketController {
  static async createTicket(req, response) {
    try {
      const ticket = new Ticket({ ...req.body, user: req.user._id });
      await ticket.save();
      return request_response({
        response,
        status_code: 201,
        message: "Ticket Created",
        data: ticket,
      });
    } catch (error) {
      console.log("errrrr", error);
      return request_response({ response });
    }
  }
}
