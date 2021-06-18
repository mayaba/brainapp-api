"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faceDetect = void 0;
const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'd7e60735595f4a50a55dfefe2e83a7d3'
});
function faceDetect(req, res) {
    const { imgURL } = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, imgURL).then((resp) => {
        res.json(resp);
    }).catch((err) => (res.status(400).json(err)));
}
exports.faceDetect = faceDetect;
