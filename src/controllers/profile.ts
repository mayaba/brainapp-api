import { IUser } from '../IdbInterfaces';
import {Request, Response } from 'express';

export function profile(req: Request, res: Response, db: any) {
    const { id } = req.params;

    if (!id)
        return res.status(400).json('Your request has an empty field');

    db('userinfo')
        .where('user_id', id)
        .select('*')
        .then((user: IUser[]) => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json("User not found")
            }
        })
        .catch((err: Error) => res.status(400).json(err));
}