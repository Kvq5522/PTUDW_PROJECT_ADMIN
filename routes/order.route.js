const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

router.get('/', (req, res) => {
    controller.getOrderPage(req, res);
});

module.exports = router;