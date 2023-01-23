module.exports = app =>{
    const express = require('express');
    const router = express.Router();
    const delivery = require('../controllers/delivery.controller');
    const protected = require('../config/protected.config');

    router.get('/all',  delivery.findAll);
    router.post('/create', protected,delivery.create);
    router.put('/update/:id', protected,delivery.update);
    router.delete('/delete/:id', protected,delivery.delete);
    router.get('/:id', delivery.findOne);

    app.use('/delivery', router);
}; 