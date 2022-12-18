const express = require('express');
const router = express.Router();
const controller = require('../controllers/Home.controller');

router.get('/', (req, res) => {
    controller.getHomePage(req, res);
});

router.get('/login', (req, res) => {
    controller.getLoginPage(req, res);
});

router.post('/login', (req, res, next) => {
    controller.postLoginPage(req, res, next);
});

router.get('/logout', (req, res) => {
    controller.getLogoutPage(req, res);
});

module.exports = router;