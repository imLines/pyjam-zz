const jwt = require('jsonwebtoken');

function decryptAccessToken(req, res, next){
    try{
        const token =  req.get('Authorization')
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN_ADMIN)
        
        if(decodedToken){
            next();
        }else{
            res.status(401).send({message: "You need to be login for continue"});
        }
        
    }catch(e){
        res.status(400).json({e});
    }
};

module.exports = decryptAccessToken; 