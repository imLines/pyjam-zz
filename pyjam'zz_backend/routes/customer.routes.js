module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const customer = require('../controllers/customer.controller');
    const protected = require('../config/protected.config');
    const auth = require('../config/auth.config');

    router.post('/create', protected,customer.create);
    router.get('/profil', auth, customer.getProfil);
    router.get('/all', protected,customer.findAll);
    router.put('/update/:id', auth, customer.update);
    router.delete('/ban/:id', protected, customer.delete);
    router.get('/:id', auth, customer.findOne); 

    app.use('/customer', router);
};     