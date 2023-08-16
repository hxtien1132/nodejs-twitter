import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/medias.controllers'
const staticRouter = Router()

//link image res
staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name', serveVideoStreamController)

export default staticRouter
