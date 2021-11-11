import { request_response } from "../../utils/api.response";
import { User } from "./user.model";
import { newToken } from "./user.utils";

export class UserController {
  static async signup(req, response) {
    try {
      const user = new User({ ...req.body });
      await user.save();
      return request_response({
        response,
        status_code: 201,
        message: "User Created",
        data: user,
      });
    } catch (error) {
      return request_response({ response });
    }
  }
  static async signin(req, response) {
    try {
      const user = await User.findOne({ email: req.body.email })
        .select("email password")
        .exec();

      if (!user) {
        return request_response({
          response,
          status_code: 404,
          message: "User not found",
        });
      }

      const match = await user.checkPassword(req.body.password);

      if (!match) {
        return request_response({
          response,
          status_code: 401,
          message: "Invalid password",
        });
      }

      const token = newToken(user);
      return request_response({
        response,
        status_code: 201,
        message: "User successfully signed in",
        data: token,
      });
    } catch (error) {
      console.log(error);
      return request_response({ response });
    }
  }
}
