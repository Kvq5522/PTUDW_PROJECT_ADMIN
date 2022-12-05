const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', async (req, res) => {
    await controller.getProductPage(req, res);
}); 

router.get('/submit', async (req, res) => {
   await controller.getSubmitPage(req, res);
});

router.post('/submit', async (req, res) => {
    await controller.submitProduct(req, res);
});

router.get('/delete/:productID', async (req, res) => {
    await controller.deleteProduct(req, res);
}); 

module.exports = router;
