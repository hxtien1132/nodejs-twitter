import express, { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    console.log('err defaultErrorHandler', err)
    return res.status(err.status).json(omit(err, ['status'])) //message and errors
  }
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  //err 500
  res.status(HTTP_STATUS.INTERNAL_SEVER_ERROR).json({
    message: err.message,
    errorInfo: omit(err, ['stack'])
  })
}
