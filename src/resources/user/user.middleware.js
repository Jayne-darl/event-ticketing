import { signup_schema, signin_schema } from './user.validation'
import { User } from './user.model'
import { request_response } from '../../utils/api.response'

export const signup_validate = async (req, response, next) => {
  try {
    const value = await signup_schema.validateAsync(req.body)
    req.body = value
    return next()
  } catch (error) {
    return request_response({
      response,
      status_code: 422,
      message: error.details[0].message,
    })
  }
}
export const check_if_user_already_exists = async (req, response, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return request_response({
        response,
        status_code: 400,
        message: 'User with email already exist',
      })
    }
    return next()
  } catch (error) {
    return request_response({
      response,
    })
  }
}

export const signin_validate = async (req, response, next) => {
  try {
    const value = await signin_schema.validateAsync(req.body)
    req.body = value
    return next()
  } catch (error) {
    return request_response({
      response,
      status_code: 422,
      message: error.details[0].message,
    })
  }
}
