import { Request } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { File } from 'formidable'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // mục đích là để tạo folder nested
      })
    }
  })
}
export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}

//c
export const handleUploadImage = async (req: Request) => {
  //import kiểu common module vì cái này là es module
  // const formidable = (await import('formidable')).default

  //setup ảnh
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFields: 4, // maximum 4 image
    keepExtensions: true,
    maxFiles: 300 * 1024, //300kb
    maxTotalFileSize: 300 * 1024 * 4, //
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  // trả về thông tim image
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log('fields', fields)
      // console.log('files', files)
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image as File[])
    })
  })
}

//
export const handleUploadVideo = async (req: Request) => {
  //import kiểu common module vì cái này là es module
  // const formidable = (await import('formidable')).default

  //setup video
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR,
    maxFields: 1, // maximum 1
    maxFiles: 50 * 1024 * 1024, //50mb
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  // trả về thông tim image
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log('fields', fields)
      // console.log('files', files)
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.video)) {
        return reject(new Error('File is empty'))
      }
      const videos = files.video as File[]
      videos.forEach((video) => {
        //rename the video
        const ext = getExtension(video.originalFilename as string) //mp4
        fs.renameSync(video.filepath, video.filepath + '.' + ext)
        video.newFilename = video.newFilename + '.' + ext
      })
      resolve(files.video as File[])
    })
  })
}

export const getExtension = (fullname: string) => {
  const nameArr = fullname.split('.')
  return nameArr[nameArr.length - 1]
}
