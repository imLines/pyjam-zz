const jwt = require('jsonwebtoken');
const WishList = require('../models/wishList.model');

exports.create = (req, res)=>{
    try{
        const productId = req.params.id;
        const token =  req.get('Authorization')
        const decrypt = jwt.verify(token, process.env.SECRET_KEY_TOKEN_CUSTOMER)
        const customerId =decrypt.customerId
        WishList.findOne({raw: true, where:{productId: productId, customerId: customerId}})
        .then(element=>{
            if(element){
                res.status(400).send({message: "This Product was in your wishlist."})
            }else{
                WishList.create({customerId, productId})
                res.status(200).send({message: "This action is a success."})

            }
        })
    }catch(e){
        res.status(400).send({massage: "Error"+e})
    }
}; 

exports.findAll = (req, res)=>{
    try{
        const token =  req.get('Authorization')
        const decrypt = jwt.verify(token, process.env.SECRET_KEY_TOKEN_CUSTOMER)
        const customerId =decrypt.customerId
        WishList.findAll({where:{customerId: customerId}})
        .then(allItem=>{
            if(allItem){
                res.status(200).json({allItem});
            }else{
                res.status(400).send({message: "None item in your wishlist."})
            }
        })
    }catch(e){
        res.status(400).send({message: "Error:"+e})
    }
};

exports.delete = (req ,res)=>{
    try{
        const wishListItemID = req.params.id;
        const token =  req.get('Authorization')
        const decrypt = jwt.verify(token, process.env.SECRET_KEY_TOKEN_CUSTOMER)
        const customerId =decrypt.customerId;

        WishList.destroy({where: {id: wishListItemID, customerId: customerId}})
        res.status(200).send({message: "It was deleted"})
    }catch(e){
        res.status(400).send({message: "Error :" + e});
    }
};