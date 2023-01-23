module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const purchase = require('../controllers/purchase.controller');
    const auth = require('../config/auth.config');

    router.post('/new',  auth, purchase.create);

    app.use('/purchase', router)
};  