const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');

router.get('/', (req, res) => {
    controller.getCustomerPage(req, res);
});

module.exports = router;