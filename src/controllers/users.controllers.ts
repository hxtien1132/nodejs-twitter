import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { StringifyOptions } from 'querystring'
import { USERS_MESSAGES } from '~/constants/messages'
import { RegisterReqBody } from '~/models/requests/user.requests'
import User from '~/models/schemas/user.schema'
import userService from '~/services/users.services'
export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userService.register(req.body)
  return res.status(200).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
