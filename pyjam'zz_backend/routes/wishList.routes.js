module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const wishList = require('../controllers/wishList.controller');
    const auth = require('../config/auth.config');
    

    router.get('/all', auth, wishList.findAll);

    router.post('/add/:id',  auth,wishList.create);

    router.delete('/delete/:id', auth,wishList.delete);

    app.use('/wishlist', router)
 
};  