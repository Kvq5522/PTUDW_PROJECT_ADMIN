const express = require('express');
const router = express.Router();
const controller = require('../controllers/Customer.controller');

router.get('/', (req, res) => {
    controller.getCustomerPage(req, res);
});

router.get('/detail/:customerID', (req, res) => {
    controller.getCustomerDetailPage(req, res)
});

router.get('/ban/:customerID', (req, res) => {
    controller.banCustomer(req, res);
});

router.get('/unban/:customerID', (req, res) => {
    controller.unbanCustomer(req, res);
}); 

module.exports = router;