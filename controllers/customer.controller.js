const users = require('../models/User.model')

const getCustomerPage = (req, res) => {
    users.User.find({role: 'user'}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Interal server error');
        }

        res.render('customer', {customerList: data});
    })
}

const getCustomerDetailPage = (req, res) => {
    const userID = req.params.id;

    users.User.findOne({id: userID}, (err, data) => {
        if (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Interal server error');
            }        
        }

        res.send(data);
    });
};

module.exports = {
    getCustomerPage,
    getCustomerDetailPage
}