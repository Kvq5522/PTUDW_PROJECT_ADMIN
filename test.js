const connectDB = require('./config/db');
const users = require('./models/User.model');
const products = require('./models/Product.model');
const express = require('express');
const app = express();

connectDB();

products.Product.find({}).exec((err, data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].available = true;
        data[i].save();
    }
});
