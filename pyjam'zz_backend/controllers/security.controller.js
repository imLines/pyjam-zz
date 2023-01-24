const Customer = require('../models/customer.model');
const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createLetterConfirmEmail = require('../nodemailer/confirmEmail')


exports.registration = async (req, res) => {
    if(!req.body.genre || !req.body.lastName || !req.body.dateOfBirth || !req.body.firstName  || !req.body.email || !req.body.password || !req.body.phone){
        res.status(400).send({message: "Le formulaire n'est pas complet."})
    }else{
        const genre = req.body.genre;
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const email = req.body.email;
        const PasswordNoHashed = req.body.password;
        const dateOfBirth = req.body.dateOfBirth;
        const phone = req.body.phone;

        Customer.findOne({where: {email: email}}) 
        .then(user=>{
            if(user == null){
                    bcrypt.hash(PasswordNoHashed, 10)
                    .then(hashedPassword=>{
                        const password = hashedPassword;
                        const tokenToVerifyAccount = jwt.sign({user: email}, process.env.SECRET_KEY_EMAIL, {expiresIn: "24h"});
                        const urlForVerifyAccount = `http://localhost:5173/client/verification-email/${tokenToVerifyAccount}`
                        createLetterConfirmEmail(urlForVerifyAccount, email)
                        Customer.create({genre, lastName, firstName,  email, password, phone, dateOfBirth, validate: true}) 
                        res.status(201).send({message: "Your account has been successfully created."});
                    })
            }else{
                res.status(400).send({message: "This email was already used. Please reset your password or choose another email."})
            }
        }) 
    }
};


exports.login = (req, res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        Customer.findOne({raw: true, where: {email: email}})
        .then(customer=> {
            if(customer){
                const customerPassword = customer.password;
                bcrypt.compare(password, customerPassword)
                .then(validate => {
                    if(validate){
                        const id = customer.id; 
                        const email = customer.email;
                        const token = jwt.sign({customerId: id}, process.env.SECRET_KEY_TOKEN_CUSTOMER, {expiresIn: "3h"});
                        res.status(200).json({token: token, customer:{email} });
                    }else{
                        res.status(400).send({message: "Incorrect password."})
                    }
                })
                
            }else{
                res.status(400).send({message: "Une erreur s'est produite"});
            }
            }) 
        
          
    }catch(e){
        res.status(400).send({message: "Error :"+e})
    };
};


exports.changePassword = (req, res)=>{
    try{
        if(!req.body.newPassword){
            res.status(400).send({message: "Forgot data."})
        }else{
            const token =  req.get('Authorization');
            const tokenDecrypt = jwt.verify(token, process.env.SECRET_KEY_TOKEN_CUSTOMER);
            Customer.findOne({raw: true, where:{id: tokenDecrypt.customerId}})
            .then(customer=>{
                const newpassword = req.body.newPassword
                bcrypt.hash(newpassword, 10)
                .then(newPasswordHashed=>{
                    Customer.update({password: newPasswordHashed},{ where:{id: tokenDecrypt.customerId}})
                    res.status(200).send({message: "Password changed successfully."})
                })
            })
        }
    }catch(e){
        res.status(400).send({message: "Error: "+e});
    }
}