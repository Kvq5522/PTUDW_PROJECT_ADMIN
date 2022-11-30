const express = require('express');
const router = express.Router();
const controller = require('../controller/customer.controller');

router.get('/', (req, res) => {
    controller.getCustomerPage(req, res);
});

module.exports = router;