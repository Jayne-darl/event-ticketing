/* eslint-disable no-undef */
import mongoose from 'mongoose'

const url =
  'mongodb://localhost:27017,localhost:27018,localhost:27019/event-ticketing-test?replicaSet=rs'

beforeEach((done) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})
afterAll((done) => done())
