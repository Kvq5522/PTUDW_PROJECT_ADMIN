const users = require('../models/User.model');
const passport = require('passport');

const getHomePage = (req, res) => {
    res.render('index');
}

const getLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/product');
        return;
    }

    res.render('login');
}

const postLoginPage = (req, res, next) => {
    const user = new users.User({
        username: req.body.username,
        password: req.body.password
    })

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
            return
        }

        if (!user) {
            res.send(info.message);
            return;
        }

        if (user.role !== 'admin') {
            res.send('Not authorized');
            return;
        }

        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
            }

            res.redirect('/product');
        });
    })(req, res, next);
}

const getLogoutPage = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    });
}

module.exports = {
    getHomePage,
    getLoginPage,
    postLoginPage,
    getLogoutPage
}