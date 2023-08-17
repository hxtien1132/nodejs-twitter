import { Router } from 'express'
import {
  serveImageController,
  serveM3u8Controller,
  serveSegmentController,
  serveVideoStreamController
} from '~/controllers/medias.controllers'
const staticRouter = Router()

//link image,image res
staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name', serveVideoStreamController)
//
//
//plus
staticRouter.get('/video-hls/:id/master.m3u8', serveM3u8Controller)
staticRouter.get('/video-hls/:id/:v/:segment', serveSegmentController)
export default staticRouter
