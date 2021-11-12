import { User } from '../../resources/user/user.model'
import { authorise_user, verifyToken } from '../auth'

describe('Authorisation', () => {
  test('check for authorisation in header ', async () => {
    const req = { headers: {} }
    const res = {
      status(status) {
        expect(status).toBe(401)
        return this
      },
      json(result) {
        expect(typeof result.message).toBe('string')
        expect(result.message).toBe('Unauthorised')
      },
    }

    await authorise_user(req, res)
  })
})
