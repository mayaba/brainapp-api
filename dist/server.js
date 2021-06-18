"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const cors_1 = __importDefault(require("cors"));
const register_1 = require("./controllers/register");
const signin_1 = require("./controllers/signin");
const profile_1 = require("./controllers/profile");
const image_1 = require("./controllers/image");
const faceDetect_1 = require("./controllers/faceDetect");
const app = express_1.default();
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'brainsmart'
    }
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('IT IS WORKING');
    // db.select('*').from('userinfo')
    //     .then((rows: IUser[]) => res.json(rows))
    //     .catch((err: Error) => console.log(JSON.parse(err.toString()).detail))
});
app.post('/signin', (req, res) => {
    signin_1.signin(req, res, db, bcrypt_nodejs_1.default);
});
app.post('/register', (req, res) => {
    register_1.register(req, res, db, bcrypt_nodejs_1.default);
});
app.get('/profile/:id', (req, res) => {
    profile_1.profile(req, res, db);
});
app.put('/image/', (req, res) => {
    image_1.imageScore(req, res, db);
});
app.post('/faceDetect/', (req, res) => {
    faceDetect_1.faceDetect(req, res);
});
app.listen(process.env.PORT || 3001);
