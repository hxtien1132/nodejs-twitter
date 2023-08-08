import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()
//chuyển thành JWT
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  payload: string | Buffer | Object
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
