import jwt from "jsonwebtoken";
import app_config from "../../config";

export const newToken = (user) => {
  return jwt.sign({ id: user._id }, app_config.secrets.jwt, {
    expiresIn: app_config.secrets.jwt_exp,
    algorithm: "HS256",
  });
};
