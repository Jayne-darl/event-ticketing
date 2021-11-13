import { Router } from 'express';
import { ROUTES } from './routes';
import { eventController } from './event.controllers';
import {
  validate_create_event_formdata,
  validate_update_event_formdata, is_valid_event_time,
} from './event.middleware';
import { authorise_user } from '../../utils/auth';

const { EVENT, USER_EVENT, SINGLE_EVENT } = ROUTES;

const {
  createEvent, getAllEvents, getMyEvents, updateEvent, deleteEvent,
} = eventController;

const eventRouter = Router();

eventRouter.post(
  EVENT,
  authorise_user,
  validate_create_event_formdata,
  is_valid_event_time,
  createEvent,
);
eventRouter.get(EVENT, authorise_user, getAllEvents);
eventRouter.get(USER_EVENT, authorise_user, getMyEvents);
eventRouter.patch(
  SINGLE_EVENT,
  authorise_user,
  validate_update_event_formdata,
  is_valid_event_time,
  updateEvent,
);
eventRouter.delete(SINGLE_EVENT, authorise_user, deleteEvent);

export default eventRouter;
