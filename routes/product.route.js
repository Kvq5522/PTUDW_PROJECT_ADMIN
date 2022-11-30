const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', (req, res) => {
    controller.getProductPage(req, res);
}); 

router.get('/submit', (req, res) => {
    controller.getSubmitPage(req, res);
});

module.exports = router;
