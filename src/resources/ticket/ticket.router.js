import { Router } from 'express';
import { ROUTES } from './routes';
import { ticketController } from './ticket.contollers';
import {
  check_if_event_exists,
  validate_ticket_request,
} from './ticket.middleware';
import { authorise_user } from '../../utils/auth';

const { TICKET } = ROUTES;

const { createTicket } = ticketController;

const ticketRouter = Router();

ticketRouter.post(
  TICKET,
  authorise_user,
  validate_ticket_request,
  check_if_event_exists,
  createTicket,
);

export default ticketRouter;
