const express = require('express');
const router = express.Router();
const controller = require('../controllers/Customer.controller');

router.get('/', (req, res) => {
    controller.getCustomerPage(req, res);
});

module.exports = router;