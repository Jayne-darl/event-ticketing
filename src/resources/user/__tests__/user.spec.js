import { User } from '../user.model'
import { UserController } from '../user.controllers'
import {
  signin_validate,
  signup_validate,
  check_if_user_already_exists,
} from '../user.middleware'

const { signup, signin } = UserController

it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})

describe('signup', () => {
  test('requires name, email and password', async () => {
    expect.assertions(2)
    const req = { body: {} }
    const res = {
      status(status) {
        expect(status).toBe(422)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }

    await signup_validate(req, res)
  })
  test('creates user document', async () => {
    expect.assertions(3)
    const req = {
      body: { name: 'Tope', email: 'tope@gmail.com', password: '1234rght' },
    }
    const res = {
      status(status) {
        expect(status).toBe(201)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(typeof result.data).toBe('object')
      },
    }

    await signup(req, res)
  })
  test('user with email already exist', async () => {
    expect.assertions(3)

    const fields = {
      name: 'Tope',
      email: 'tope@gmail.com',
      password: '1234rght',
    }
    await User.create(fields)

    const req = {
      body: { email: 'tope@gmail.com' },
    }
    const res = {
      status(status) {
        expect(status).toBe(400)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(result.message).toBe('User with email already exist')
      },
    }
    await check_if_user_already_exists(req, res)
  })
})

describe('signin', () => {
  test('requires email and password', async () => {
    const req = { body: {} }
    const res = {
      status(status) {
        expect(status).toBe(422)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }
    await signin_validate(req, res)
  })
  test('user should exist', async () => {
    expect.assertions(3)

    const req = { body: { email: 'tunde@gmail.com', password: '1234rght' } }
    const res = {
      status(status) {
        expect(status).toBe(404)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(result.message).toBe('User not found')
      },
    }
    await signin(req, res)
  })
  test('user password should match', async () => {
    expect.assertions(3)

    await User.create({
      name: 'Tope',
      email: 'tope@gmail.com',
      password: '1234rghk',
    })

    const req = { body: { email: 'tope@gmail.com', password: '1234rghi' } }
    const res = {
      status(status) {
        expect(status).toBe(401)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(result.message).toBe('Invalid password')
      },
    }
    await signin(req, res)
  })
  test('creates new token and signin user', async () => {
    expect.assertions(5)

    await User.create({
      name: 'Tope',
      email: 'tope@gmail.com',
      password: '1234rghk',
    })

    const req = { body: { email: 'tope@gmail.com', password: '1234rghk' } }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(typeof result.data).toBe('object')
        expect(typeof result.data.token).toBe('string')
        expect(result.message).toBe('User successfully signed in')
      },
    }
    await signin(req, res)
  })
})
