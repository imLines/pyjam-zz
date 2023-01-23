
module.exports = app =>{
    const express = require('express');
    const router = express.Router();
    const productAndSize = require('../controllers/productAndSize.controller');
    const protected = require('../config/protected.config');

    router.get('/all', productAndSize.findAll ); //Rajouter le protected !!!!
    router.get('/novelty', productAndSize.getNovelty)
    router.get('/images/:id', productAndSize.getImages);
    router.get('/list/:category', productAndSize.findAllByCategory);
    router.post('/new',  productAndSize.create); 
    router.post('/size/add/:id', productAndSize.addSize);
    router.put('/size/:id', productAndSize.updateSize);
    router.delete('/delete/:id', productAndSize.delete);
    router.get('/:id', productAndSize.findOne);
    router.post('/:id', productAndSize.update);

    app.use('/product', router); 
}    