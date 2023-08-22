import express from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import mediasRouter from './routers/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routers/static.routes'
import tweetsRouter from './routers/tweets.routes'
import bookmarksRouter from './routers/bookmarks.routes'
import likesRouter from './routers/likes.routes'
// import '~/utils/fake'
config()
const app = express()
const port = process.env.PORT || 4000
//tạo folder upload
initFolder()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  // databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
app.use(express.json()) //Sử dụng express.json() middleware để xử lý dữ liệu JSON trong yêu cầu
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)

///
//static 2 cach : xem video
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR)) //c1
app.use('/static', staticRouter) //c2
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên http://localhost:${port}/`)
})
