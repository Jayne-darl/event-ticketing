import { create_event_schema, update_event_schema } from './event.validation'
import { request_response } from '../../utils/api.response'

export const validate_create_event_formdata = async (req, response, next) => {
  try {
    const value = await create_event_schema.validateAsync(req.body)
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
export const validate_update_event_formdata = async (req, response, next) => {
  try {
    const value = await update_event_schema.validateAsync(req.body)
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
