"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
function signin(req, res, db, bcrypt) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json('Your request has an empty field');
    }
    db('login').where({ username })
        .select('username', 'password')
        .then((loginfo) => {
        const isValid = bcrypt.compareSync(password, loginfo[0].password);
        if (isValid) {
            db('userinfo').where({ username })
                .select('*').then((user) => {
                res.json(user[0]);
            }).catch((err) => {
                res.status(400).json('Could not retrieve information');
            });
        }
        else
            res.status(400).json('Wrong credentials');
    }).catch((err) => {
        res.status(400).json('Failed to log in');
    });
}
exports.signin = signin;
