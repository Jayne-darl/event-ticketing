import { Router } from 'express'
import userRouter from './resources/user/user.router'
import eventRouter from './resources/event/event.router'
import ticketRouter from './resources/ticket/ticket.router'

const testRouter = Router()

testRouter.all('/', (_, res) => res.json({ message: 'Welcome to Event Ticketing Platform' }))

const appRouter = [testRouter, userRouter, eventRouter, ticketRouter]

export default appRouter
