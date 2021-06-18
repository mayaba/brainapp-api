"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
function register(req, res, db, bcrypt) {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json('Your request has an empty field');
    }
    if (!validateEmail(req.body.email)) {
        return res.status(400).json('The email is invalid!');
    }
    const hash = bcrypt.hashSync(password);
    const newuser = {
        name, username, email, joined_date: new Date()
    };
    const newLogin = {
        username, password: hash
    };
    db.transaction((trx) => {
        trx.insert({
            username: newLogin.username,
            password: newLogin.password
        }).into('login').then(() => {
            trx('userinfo').returning('*').insert(newuser)
                .then((user) => {
                return res.json({
                    name: user[0].name,
                    score: user[0].score,
                    user_id: user[0].user_id
                });
            });
        }).then(trx.commit)
            .catch(trx.rollback);
    }).then((resp) => {
        console.log('Transaction complete.');
    }).catch((err) => {
        res.status(400).json('Error');
        console.error(err);
    });
}
exports.register = register;
