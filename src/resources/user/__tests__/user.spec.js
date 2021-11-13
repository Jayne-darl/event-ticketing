import request from 'supertest';
import faker from 'faker';
import { User } from '../user.model';
import { ROUTES } from '../routes';
import app from '../../../server';

it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

const email = 'tundeoyoyo@gmail.com';
const password = '12345gh778';
beforeEach(async () => {
  const user = await User.create({
    email,
    password,
    name: faker.name.findName(),
  });
});

const BASE_URL = '/api/v1';

describe('signup', () => {
  test('validates signup formdata', async () => {
    const body = {};

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_UP}`)
      .send(body);
    expect(response.statusCode).toBe(422);
  });

  test('creates user document', async () => {
    const body = {
      name: faker.name.findName(),
      email: 'ogbongeti@gmail.com',
      password: faker.internet.password(8, true, new RegExp('^[a-zA-Z0-9]{3,30}$')),
    };

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_UP}`)
      .send(body);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.token).toBeTruthy();
    expect(typeof response.body.data.token).toBe('string');
  });
  test('user with email already exist', async () => {
    const body = {
      name: faker.name.findName(),
      email: 'tundeoyoyo@gmail.com',
      password: faker.internet.password(),
    };

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_UP}`)
      .send(body);
    expect(response.statusCode).toBe(400);
  });
});

describe('signin', () => {
  test('validates signin data', async () => {
    const body = {};

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_IN}`)
      .send(body);
    expect(response.statusCode).toBe(422);
  });
  test('signing in user that doesn\'t exist', async () => {
    const body = {
      email: 'tope@gmail.com',
      password: faker.internet.password(),
    };

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_IN}`)
      .send(body);
    expect(response.statusCode).toBe(404);
  });
  test('signing in with invalid password', async () => {
    const body = {
      email: 'tundeoyoyo@gmail.com',
      password: '12345gh7ty',
    };

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_IN}`)
      .send(body);
    expect(response.statusCode).toBe(401);
  });
  test('signs in user', async () => {
    const body = {
      email: 'tundeoyoyo@gmail.com',
      password: '12345gh778',
    };

    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.SIGN_IN}`)
      .send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeTruthy();
    expect(typeof response.body.data.token).toBe('string');
  });
});
