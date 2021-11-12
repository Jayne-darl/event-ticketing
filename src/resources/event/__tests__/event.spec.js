import mongoose from 'mongoose'
import { Event } from '../event.model'
import { eventController } from '../event.controllers'
import { validate_create_event_formdata } from '../event.middleware'

const { createEvent, getAllEvent, getMyEvent, updateEvent, deleteEvent } =
  eventController

describe('create event', () => {
  test('requires event formdata ', async () => {
    const req = {
      body: {},
    }
    const res = {
      status(status) {
        expect(status).toBe(422)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }

    await validate_create_event_formdata(req, res)
    
  })
  test('create an event ', async () => {
    const user = mongoose.Types.ObjectId()
    const body = {
      name: 'Birthday',
      virtual: true,
      date: '12/03/2021',
      time: 1639177200000,
      active: false,
      free: true,
    }
    const req = {
      body,
      user: { _id: user },
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

    await createEvent(req, res)
  })
})

describe('get Event', () => {
  test('get all event', async () => {
    const req = {}
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(typeof result.data).toBe('object')
      },
    }
    await getAllEvent(req, res)
  })

  test('get all user event', async () => {
    const user = mongoose.Types.ObjectId()

    const req = {
      user: { _id: user },
    }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(typeof result.data).toBe('object')
      },
    }
    await getMyEvent(req, res)
  })
})

describe('Update Event', () => {
  test('update an event', async () => {
    expect.assertions(2)

    const user = mongoose.Types.ObjectId()
    const event = await Event.create({
      name: 'Birthday',
      virtual: true,
      date: '12/03/2021',
      time: 1639177200000,
      active: false,
      free: true,
      createdBy: user,
    })
    const body = { active: 'true' }
    const req = {
      params: { id: event._id },
      user: { _id: user },
      body,
    }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }
    await updateEvent(req, res)
  })
  test('event not found', async () => {
    expect.assertions(2)

    const user = mongoose.Types.ObjectId()
    const body = { active: 'true' }
    const req = {
      params: { id: '618e25847166e8371b63ae1a' },
      user: { _id: user },
      body,
    }
    const res = {
      status(status) {
        expect(status).toBe(404)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }
    await updateEvent(req, res)
  })
})

describe('delete event', () => {
  test('delete an event', async () => {
    expect.assertions(2)

    const user = mongoose.Types.ObjectId()
    const event = await Event.create({
      name: 'Birthday',
      virtual: true,
      date: '12/03/2021',
      time: 1639177200000,
      active: false,
      free: true,
      createdBy: user,
    })
    const req = {
      params: { id: event._id },
      user: { _id: user },
    }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }
    await deleteEvent(req, res)
  })
  test('event not found', async () => {
    expect.assertions(2)

    const user = mongoose.Types.ObjectId()
    const req = {
      params: { id: '618e25847166e8371b63ae1a' },
      user: { _id: user },
    }
    const res = {
      status(status) {
        expect(status).toBe(404)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
      },
    }
    await deleteEvent(req, res)
  })
})
