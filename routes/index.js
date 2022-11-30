const homeRouter = require('./home.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');
const customerRouter = require('./customer.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/product', productRouter);
    app.use('/order', orderRouter);
    app.use('/customer', customerRouter);
};

module.exports = route;