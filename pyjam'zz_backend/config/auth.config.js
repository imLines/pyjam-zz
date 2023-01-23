const jwt = require('jsonwebtoken');

function decryptAccessToken(req, res, next){
    try{
        const token =  req.get('Authorization')
        const decodedTokenCustomer = jwt.verify(token, process.env.SECRET_KEY_TOKEN_CUSTOMER)
        
        if(decodedTokenCustomer){
            next();
        }else{
            res.status(401).send({message: "Vous devez être connecté pour continuer."});
        }
        
        
    }catch(e){
        res.status(400).json({e});
    }
};

module.exports = decryptAccessToken;  