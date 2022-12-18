const users = require('../models/User.model')
const qs = require('qs');

const getCustomerPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const {sort, sortValue, ...withoutFilter} = req.query;
    const sortFilter = sort ? sort : 'username';
    const sortValueFilter = sortValue ? sortValue : 1;

    let nameFilter = withoutFilter.name ? withoutFilter.name : '';

    users.User.find({username: {'$regex': nameFilter, '$options': 'i'}, role: 'user'})
    .sort([[`${sortFilter}`, sortValueFilter]]).exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }   

        res.render('customer', { customerList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}` });
    })
}

const getCustomerDetailPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const userID = req.params.customerID;

    users.User.findById(userID, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('customer_detail', { detail: user });
    });
};

const banCustomer = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const userID = req.params.customerID;

    users.User.findByIdAndUpdate(userID, {ban: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('back');
    });
};

const unbanCustomer = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const userID = req.params.customerID;

    users.User.findByIdAndUpdate(userID, {ban: false}, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('back');
    });
}

module.exports = {
    getCustomerPage,
    getCustomerPage,
    getCustomerDetailPage,
    banCustomer,
    unbanCustomer
}