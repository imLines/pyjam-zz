module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const admin = require('../controllers/admin.controller');
    const protected = require('../config/protected.config'); 

    //routes for login admin
    router.post('/login', admin.login);
    
    //routes for manage admin
    router.post('/admin/add',  admin.create);
    router.get('/admin/all',  protected,admin.findAll);
    router.put('/admin/update/:id',  protected,admin.update);
    router.delete('/admin/ban/:id',  protected,admin.delete);
    router.get('/admin/:id',  protected,admin.findOne);
 
    //routes for manage customer
    router.put('/customer/update/:id', protected,admin.updateCustomer);
    router.get('/customer/:id', protected,admin.findOneCustomer);

    

    app.use('/admin', router)

};  