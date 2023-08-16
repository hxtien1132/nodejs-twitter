import express from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import mediasRouter from './routers/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import staticRouter from './routers/static.routes'
config()
const app = express()
const port = process.env.PORT || 4000
//tạo folder upload
initFolder()

databaseService.connect()
app.use(express.json()) //convert object
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static/video', express.static(UPLOAD_IMAGE_DIR))

app.use('/static', staticRouter) //trả về image,image
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên http://localhost:${port}/`)
})
