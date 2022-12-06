const homeRouter = require('./Home.route');
const productRouter = require('./Product.route');
const orderRouter = require('./Order.route');
const customerRouter = require('./Customer.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/product', productRouter);
    app.use('/order', orderRouter);
    app.use('/customer', customerRouter);
};

module.exports = route;