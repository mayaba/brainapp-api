"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
function profile(req, res, db) {
    const { id } = req.params;
    if (!id)
        return res.status(400).json('Your request has an empty field');
    db('userinfo')
        .where('user_id', id)
        .select('*')
        .then((user) => {
        if (user.length) {
            res.json(user[0]);
        }
        else {
            res.status(400).json("User not found");
        }
    })
        .catch((err) => res.status(400).json(err));
}
exports.profile = profile;
