import mongoose from 'mongoose';
import request from 'supertest';
import faker from 'faker';
import app from '../../../server';
import { Event } from '../../event/event.model';
import { User } from '../../user/user.model';
import { newToken } from '../../user/user.utils';
import { ROUTES } from '../routes';

let token; let jwt; let user; let
  event;

beforeEach(async () => {
  jwt = `Bearer ${token}`;

  user = await User.create({
    email: 'a@a.com',
    password: 'hello',
    name: 'Jane Doe',
  });

  token = newToken(user);
  event = await Event.create({
    name: faker.name.findName(),
    virtual: true,
    eventDateTime: [
      {
        eventDate: new Date(),
        eventStartTime: new Date().getTime() + 43200, // starts 30 minutes in
        eventEndTime: new Date().getTime() + 86400, // ends am hour later
      },
    ],
    createdBy: user._id,
  });
});

const BASE_URL = '/api/v1';

describe('create ticket', () => {
  test('validates eventId is provided ', async () => {
    const body = {};
    const jwt = `Bearer ${token}`;
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.TICKET}`)
      .set('Authorization', jwt)
      .send(body);
    expect(response.statusCode).toBe(422);
  });

  test('check an eventId exists', async () => {
    const body = { eventId: mongoose.Types.ObjectId() };

    const jwt = `Bearer ${token}`;
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.TICKET}`)
      .set('Authorization', jwt)
      .send(body);
    expect(response.statusCode).toBe(404);
  });

  test('create a ticket with valid eventId', async () => {
    const body = { eventId: String(event._id) };

    const jwt = `Bearer ${token}`;
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.TICKET}`)
      .set('Authorization', jwt)
      .send(body);
    expect(response.statusCode).toBe(201);
  });
});
