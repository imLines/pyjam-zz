const Delivery = require('../models/delivery.model')

exports.create = (req, res)=>{
    try{
        const deliveryPrice = req.body.deliveryPrice;
        const company = req.body.company;

        Delivery.create({deliveryPrice, company})
        .then(()=>{
            res.status(200).send({message: "Delivery was created"});
        })
    }catch(e){
        res.status(400).send({message: "Error :"+e});
    }
};

exports.findOne = (req, res)=>{
    try{
        const id = req.params.id;

        Delivery.findOne({where: {id: id}})
        .then(delivery=>{
            res.status(200).json({delivery});
        })
    }catch(e){
        res.status(400).send({message: "Error : "+e});
    }
};

exports.findAll = (req, res)=>{
    try{
        Delivery.findAll()
        .then(deliveries =>{
            res.status(200).json({deliveries});
        })
    }catch(e){
        res.status(400).send({message: "Error :"+e})
    }
}

exports.update = (req, res)=>{
    try{
        const id = req.params.id;
        const deliveryPrice = req.body.deliveryPrice;
        const company = req.body.company;

        Delivery.update({deliveryPrice, company}, {where: {id: id}})
        .then(()=>{
            res.status(200).send({message: "Delivery is uptaded."})
        })
    }catch(e){
        res.status(400).send({message: "Error :"+e})
    }
}; 

exports.delete = (req, res)=>{
    try{
        const id = req.params.id;

        Delivery.destroy({where: {id: id}})
        .then(()=>{
            res.status(200).send({message: "Delivery selected is delete."})
        })
    }catch(e){
        res.status(400).send({message: "Error : "+e});
    }
} 