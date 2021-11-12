import mongoose from 'mongoose'
import { ticketController } from '../ticket.contollers'
import {
  check_if_event_exists,
  validate_ticket_request,
} from '../ticket.middleware'

const { createTicket } = ticketController

describe('create ticket', () => {
  test('requires an eventId ', async () => {
    const body = {}
    const req = {
      body,
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

    await validate_ticket_request(req, res)
  })
  test('check an event exist ', async () => {
    const req = {
      body: { eventId: '618e25847166e8371b63ae1a' },
    }
    const res = {
      status(status) {
        expect(status).toBe(404)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(result.message).toEqual('Event not found')
      },
    }

    await check_if_event_exists(req, res)
  })
  test('create a ticket', async () => {
    const user = mongoose.Types.ObjectId()
    const eventId = mongoose.Types.ObjectId()
    const body = { eventId: eventId }
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
        expect(result.message).toBe('Ticket Created')
      },
    }

    await createTicket(req, res)
  })
})
