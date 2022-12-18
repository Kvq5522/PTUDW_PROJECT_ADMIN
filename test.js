const connectDB = require('./config/db');
const users = require('./models/User.model');
const products = require('./models/Product.model');
const express = require('express');
const app = express();

connectDB();
