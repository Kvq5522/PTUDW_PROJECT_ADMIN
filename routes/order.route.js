const express = require('express');
const router = express.Router();
const controller = require('../controllers/Order.controller');

router.get('/', (req, res) => {
    controller.getOrderPage(req, res);
});

module.exports = router;