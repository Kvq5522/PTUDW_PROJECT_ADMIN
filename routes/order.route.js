const express = require('express');
const router = express.Router();
const controller = require('../controllers/Order.controller');

router.get('/', (req, res) => {
    controller.getOrderPage(req, res);
});

router.get('/detail/:orderID', (req, res) => {
    controller.getOrderDetailPage(req, res);
});

router.get('/submit', (req, res) => {
    controller.submitOrder(req, res);
});

module.exports = router;