import { IUser, ILogin } from '../IdbInterfaces';
import {Request, Response } from 'express';

export function signin(req: Request, res: Response, db: any, bcrypt: any) {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json('Your request has an empty field');
    }

    db('login').where({ username })
        .select('username', 'password')
        .then((loginfo: ILogin[]) => {
            const isValid: Boolean =
                bcrypt.compareSync(password, loginfo[0].password);
            if (isValid) {
                db('userinfo').where({ username })
                    .select('*').then((user: IUser[]) => {
                        res.json(user[0]);
                    }).catch((err: Error) => {
                        res.status(400).json('Could not retrieve information');
                    })
            }
            else
                res.status(400).json('Wrong credentials');
        }).catch((err: Error) => {
            res.status(400).json('Failed to log in');
        })
}