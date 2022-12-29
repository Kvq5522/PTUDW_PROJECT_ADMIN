const express = require('express');
const router = express.Router();
const controller = require('../controllers/Product.controller');

router.get('/', async (req, res) => {
    await controller.getProductPage(req, res);
}); 

router.get('/api', async (req, res) => {
    await controller.getProductAPI(req, res);
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

router.get('/detail/:productID', async (req, res) => {
    await controller.getProductDetailPage(req, res);
});

router.post('/update/:productID', async (req, res) => {
    await controller.editProduct(req, res);
});

module.exports = router;
