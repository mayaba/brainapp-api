import express, { Application, Request, Response } from 'express';
import { IUser } from './IdbInterfaces';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import { register } from './controllers/register';
import { signin } from './controllers/signin';
import { profile } from './controllers/profile';
import { imageScore } from './controllers/image';
import {faceDetect} from './controllers/faceDetect';
import { Client } from 'pg';
import knex from 'knex';

const app: Application = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }
});



app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('IT IS WORKING');
    // db.select('*').from('userinfo')
    //     .then((rows: IUser[]) => res.json(rows))
    //     .catch((err: Error) => console.log(JSON.parse(err.toString()).detail))
})

app.post('/signin', (req: Request, res: Response) => {
    signin(req, res, db, bcrypt);
});

app.post('/register', (req: Request, res: Response) => {
    register(req, res, db, bcrypt);
});


app.get('/profile/:id', (req: Request, res: Response) => {
    profile(req, res, db);
});

app.put('/image/', (req: Request, res: Response) => {
    imageScore(req, res, db);
});

app.post('/faceDetect/', (req: Request, res: Response) => {
    faceDetect(req, res);
})

app.listen(process.env.PORT || 3001);