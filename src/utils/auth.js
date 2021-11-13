import jwt from 'jsonwebtoken';
import app_config from '../config';
import { request_response } from './api.response';
import { User } from '../resources/user/user.model';

export const verifyToken = async (token) => {
  try {
    const value = jwt.verify(token, app_config.secrets.jwt, {
      algorithms: ['HS256'],
    });

    return value;
  } catch (error) {
    throw new Error(error);
  }
};

export const authorise_user = async (req, response, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return request_response({
      response,
      status_code: 401,
      message: 'Unauthorised',
    });
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);

    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      return request_response({
        response,
        status_code: 404,
        message: 'User not found',
      });
    }
    req.user = user;
    return next();
  } catch (e) {
    return request_response({ response, status_code: 401, message: 'Invalid token' });
  }
};
