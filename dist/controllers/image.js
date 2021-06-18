"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageScore = void 0;
function imageScore(req, res, db) {
    const { id } = req.body;
    if (!id)
        return res.status(400).json('Your request has an empty field');
    db('userinfo')
        .where('user_id', id)
        .increment('score', 1)
        .returning('score')
        .then((score) => {
        if (score.length) {
            return res.json(score[0]);
        }
        else
            return res.status(400).json('User not found');
    })
        .catch((err) => res.status(400).json(err));
}
exports.imageScore = imageScore;
