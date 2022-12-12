const users = require('../models/User.model');
const passport = require('passport');

const getHomePage = (req, res) => {
    console.log(req.user);
    res.render('index');
}

const getLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/product');
    }

    res.render('login');
}

const postLoginPage = (req, res) => {
    // const { username, password } = req.body;

    // users.User.find({ username: username }, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //     }

    //     // if (user.role === 'admin') {
    //     //     const loginUser = new users.User({
    //     //         username: username,
    //     //         password: password
    //     //     });

    //     //     console.log(loginUser)

    //     //     req.login(loginUser, (err) => {
    //     //         passport.authenticate('local')(req, res, () => {
    //     //             res.redirect('/product');
    //     //         });
    //     //     });
    //     // }

    //     req.login(user, (err) => {
    //         passport.authenticate('local')(req, res, () => {
    //             res.redirect('/product');
    //         }); 
    //     });
    // });

    res.redirect('/product');
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