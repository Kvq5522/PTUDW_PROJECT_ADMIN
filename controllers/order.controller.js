const orders = require('../models/Order.model')
const products = require('../models/Product.model')

const getOrderPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const {} = req.query


    orders.Order.find({'isDeleted': false}).sort([['shippingDate', 1]]).exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('order', {orderList: data ?? []});
    })
}

const getOrderDetailPage = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const ID = req.params.orderID;

    orders.Order.findById({'_id': ID}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!data) {
            res.redirect('/order');
        }

        products.Product.find({'_id': {$in: data.items}}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.render('order_detail', {orderID: data.id, orderDetail: items ?? [], total: data.total})
        });
    });
}
const submitOrder = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const { isDone, isDeleted, orderID } = req.query;

    if (orderID === undefined || (isDone === undefined && isDeleted === undefined)) {
        res.redirect('/order');
        return;
    }

    orders.Order.findByIdAndUpdate(orderID, {isDone: isDone, isDeleted: isDeleted}, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('/order');
    });
};

module.exports = {  
    getOrderPage, 
    getOrderDetailPage,
    submitOrder
}