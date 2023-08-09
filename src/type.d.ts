import { Request } from 'express'
//defined global
import {} from 'express'
import User from './models/schemas/user.schema'
import { TokenPayload } from './models/requests/user.requests'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
