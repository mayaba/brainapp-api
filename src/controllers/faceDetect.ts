import { Request, Response } from 'express';

const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'PUT YOUR API KEY HERE'
});

export function faceDetect(req: Request, res: Response) {
  const {imgURL} = req.body;

  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    imgURL
  ).then((resp: Response) => {
    res.json(resp);
  }).catch((err: Error) => (res.status(400).json(err)))
}