import { Request } from 'express'
//defined global
import {} from 'express'
import User from './models/schemas/user.schema'

declare module 'express' {
  interface Request {
    user?: User
  }
}
