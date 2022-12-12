const express = require('express');
const router = express.Router();
const controller = require('../controllers/Customer.controller');

router.get('/', (req, res) => {
    controller.getCustomerPage(req, res);
});

router.get('/:customerID', (req, res) => {
    controller.getCustomerDetailPage(req, res)
});

module.exports = router;