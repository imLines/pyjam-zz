const Admin = require("../models/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require("../models/customer.model");


exports.login = (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password
 
        Admin.findOne({raw: true, where:{email: email}})
        .then(admin => {
            if(admin){
                const hashedPassword = admin.password;
                bcrypt.compare(password, hashedPassword)
                .then(valid=>{
                    if(valid){
                        const adminId = admin.id;
                        const adminEmail = admin.email;
                        const adminToken = jwt.sign({token: adminId}, process.env.SECRET_KEY_TOKEN_ADMIN, {expiresIn: "3h"});
                        res.status(200).json({token: adminToken, admin: adminEmail}); 
                    }else{
                        res.status(400).send({message: "Email ou mot de passe incorrect."})
                    }
                })

            }else{
                res.status(400).send({message: "Aucun administrateur n'a été trouvé avec cette adresse mail."})
            }
        });
    }catch(e){
        res.status(400).send({message: "Erreur :"+e})
    }
}


exports.create = (req, res)=>{

    try{
        if(!req.body.email || !req.body.password || !req.body.secureAK){
            res.status(400).send({message: "Informations invalides ou manquantes."})
        }else{
            const email = req.body.email;
            const noHashPassword = req.body.password;
            const secureAKenterByAdmin = req.body.secureAK;
            if(secureAKenterByAdmin != process.env.SECURE_ADMIN_KEY){
                res.status(400).send({message: "Erreur dans le formulaire."})
            }else{
                bcrypt.hash(noHashPassword, 10)
                .then(password=>{
                    Admin.findOne({raw: true, where:{email: email}})
                    .then(data=>{
                        if(data){
                            res.status(400).send({message: "Cet admin existe déjà."})
                        }else{
                            Admin.create({email, password})
                            res.status(201).send({message: "L'admin à bien été créé."})
    
                        }
                    })
                }) 
            }
        }
    }catch(e){
       res.status(400).send({message: "Error :"+e})  
    }
};

exports.findOne = (req, res)=>{
    try{
        const id = req.params.id;
        Admin.findOne({raw: true, where: {id: id}})
        .then(admin=>{
            if(admin){
                res.status(200).json({admin})
            }else{
                res.status(404).send({message: "Cet Administrateur n'existe pas."})
            }
        })
    }catch(e){
        res.status(400).send({message:"Error:"+e})
    };
};



exports.findAll = (req, res)=>{
    Admin.findAll()
    .then(admins=>{
        if(admins){
            res.status(200).json({admins})
        }else{
            res.status(404).send({message: "Aucun admin n'a été trouvé."})
        }
    })
};


exports.update = (req, res)=>{
    try{
        const id = req.params.id;
        const secureAKenterByAdmin = req.body.secureAK;
        if(secureAKenterByAdmin != process.env.SECURE_ADMIN_KEY){
            res.status(400).send({message: "Erreur dans le formulaire."})
        }else{
            Admin.findOne({raw: true, where: {id: id}})
            .then(admin=>{
                if(admin){
                    const email = req.body.email;
                    const noHashPassword = req.body.password;
                    bcrypt.hash(noHashPassword, 10)
                    .then(password=>{
                        Admin.update({email, password}, {where: {id: id}})
                        res.status(200).send({message: "L'admin à bien été mis à jour."})
                    })
                }else{
                    res.status(404).send({message: "Aucun admin n'as été trouvé."})
                }
            })

        }
    }catch(e){
        res.status(400).send({message: "Erreur:"+e})
    }
};

exports.delete = (req, res)=>{
    try{
        const secureAKenterByAdmin = req.body.secureAK;
        if(secureAKenterByAdmin != process.env.SECURE_ADMIN_KEY){
            res.status(401).send({message: "Erreur dans le formulaire."})
        }else{
            const id = req.params.id;
            Admin.destroy({where: {id: id}})
            res.status(200).send({message: "Cet admin à bien été supprimé."})
        }
    }catch(e){
        res.status(400).send({message: "Erreur: "+e})
    }
};


//Manage customer

exports.updateCustomer = (req, res)=>{
    try{
        if(!req.body.lastName || !req.body.firstName || !req.body.sex || !req.body.email ){
            res.status(400).send({message: "Veuillez remplir les champs obligatoires"})    
        }else{
            const id = req.params.id;
            Customer.findOne({raw: true, where: {id: id}})
            .then(customer=>{
                if(customer){
                    const lastName = req.body.lastName;
                    const firstName = req.body.firstName;
                    const sex = req.body.sex;
                    const adress = req.body.adress; 
                    const adressComplement = req.body.adressComplement;
                    const country = req.body.country;
                    const postalAdress = req.body.postalAdress;
                    const email = req.body.email;
                    const phone = req.body.phone;
                    Customer.update({lastName, firstName, sex, adress, adressComplement, country, postalAdress, email, phone}, {where: {id: id}})
                    res.status(201).send({message: "Utilisateur mis à jour."})
                }else{
                    console.log(customer)
                    res.status(404).send({message: "Aucun utilisateur trouvé."})
                }
            })
        }
    }catch(e){
        res.status(400).send({message: "Erreur :"+e})
    }
}; 

exports.findOneCustomer = (req, res)=>{
    try{
        const id = req.params.id;
        Customer.findOne({where:{id: id}})
        .then(customer=>{
            if(customer){
                res.status(200).json({customer});
            }else{
                res.status(404).send({message: "Aucun client trouvé."})
            }
        })
    }catch(e){
        res.status(400).send({message: "Erreur : "+e})
    }
} 