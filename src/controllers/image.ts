import { Request, Response } from 'express';

export function imageScore(req: Request, res: Response, db: any) {
    const { id } = req.body;

    if (!id)
        return res.status(400).json('Your request has an empty field');

    db('userinfo')
        .where('user_id', id)
        .increment('score', 1)
        .returning('score')
        .then((score: Number[]) => {
            if (score.length) {
                return res.json(score[0]);
            }
            else
                return res.status(400).json('User not found');
        })
        .catch((err: Error) => res.status(400).json(err));


}