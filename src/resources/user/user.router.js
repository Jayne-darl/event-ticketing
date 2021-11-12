import { Router } from 'express'
import { ROUTES } from './routes'
import { UserController } from './user.controllers'
import {
  signup_validate,
  check_if_user_already_exists,
  signin_validate,
} from './user.middleware'

const { SIGN_UP, SIGN_IN } = ROUTES

const { signup, signin } = UserController

const userRouter = Router()

userRouter.post(SIGN_UP, signup_validate, check_if_user_already_exists, signup)
userRouter.post(SIGN_IN, signin_validate, signin)

export default userRouter
