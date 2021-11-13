
import mongoose from 'mongoose';
import request from 'supertest';
import faker from 'faker';
import { Event } from '../event.model';
import { newToken } from '../../user/user.utils';
import { ROUTES } from '../routes';
import { User } from '../../user/user.model';
import app from '../../../server';

let token; let jwt; let event; let
  user;
beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: 'hello', name: 'Jane Doe' });
  token = newToken(user);

  jwt = `Bearer ${token}`;

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

describe('create event', () => {
  test('validates event formdata ', async () => {
    const body = {
      name: 'Birthday',
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.EVENT}`)
      .set('Authorization', jwt)
      .send(body);
    expect(response.statusCode).toBe(422);
  });
  test('create an event ', async () => {
    const body = {
      name: 'Jenny',
      virtual: true,
      eventDateTime: [
        {
          eventDate: new Date(),
          eventStartTime: new Date().getTime() + 43200, // starts 30 minutes in
          eventEndTime: new Date().getTime() + 86400, // ends am hour later
        },
      ],
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.EVENT}`)
      .set('Authorization', jwt).send(body);
    expect(response.statusCode).toBe(201);
  });
});

describe('get Event', () => {
  test('get all event', async () => {
    const response = await request(app)
      .get(`${BASE_URL}${ROUTES.EVENT}`)
      .set('Authorization', jwt);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
  });

  test('get all user event', async () => {
    const response = await request(app)
      .get(`${BASE_URL}/${ROUTES.USER_EVENT}`)
      .set('Authorization', jwt);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data
      .every(({ createdBy }) => createdBy === String(user._id))).toBe(true);
  });
});

describe('Update Event', () => {
  test('update an event that exist', async () => {
    const name = faker.name.findName();
    const body = { name };
    const response = await request(app)
      .patch(`${BASE_URL}${ROUTES.EVENT}/${String(event._id)}`)
      .set('Authorization', jwt).send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(name);
  });

  test('update an event that does not exist in the database', async () => {
    const id = mongoose.Types.ObjectId();
    const name = faker.name.findName();
    const body = { name };
    const response = await request(app)
      .patch(`${BASE_URL}${ROUTES.EVENT}/${String(id)}`)
      .set('Authorization', jwt).send(body);
    expect(response.statusCode).toBe(404);
  });
});

describe('delete event', () => {
  test('delete an event that exist', async () => {
    let response = await request(app)
      .delete(`${BASE_URL}/${ROUTES.EVENT}/${String(event._id)}`)
      .set('Authorization', jwt);
    expect(response.statusCode).toBe(200);

    response = await request(app)
      .get(`${BASE_URL}${ROUTES.EVENT}`)
      .set('Authorization', jwt);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(0);
  });
  test('delete an event that does not exist in the database', async () => {
    const id = mongoose.Types.ObjectId();
    const response = await request(app)
      .delete(`${BASE_URL}${ROUTES.EVENT}/${String(id)}`)
      .set('Authorization', jwt);
    expect(response.statusCode).toBe(404);
  });
});
