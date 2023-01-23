const { sendDataToAlgolia } = require('../algolia/updateAlgoliaDatabase');
const Product = require('../models/product.model');
const Size = require('../models/size.model');
const UrlPicturesOfProduct = require('../models/urlPicturesOfProduct.model');

exports.create = async (req, res)=>{
    if(!req.body.name || !req.body.environment || !req.body.category || !req.body.description || !req.body.priceTTC || req.body.novelty == null || !req.body.color){
        res.status(400).send({message: "Données manquantes."});
    }else {
        const name = req.body.name;
        const environment = req.body.environment;
        const category = req.body.category;
        const subCategory = req.body.subCategory;
        const description = req.body.description;
        const priceTTC = req.body.priceTTC;
        const novelty = req.body.novelty; 
        const color = req.body.color;
        const url1 = req.body.url1;
        const url2 = req.body.url2;
        const url3 = req.body.url3;
        try{
            Product.findOne({raw: true, where: {name: name}})
            .then(data=>{
                if(data){
                    res.status(400).send({message: "Il existe déjà un produit avec ce nom. Choisissez un autre nom !"});
                }else{
                    Product.create({name, environment, category, subCategory, description, priceTTC, novelty, color})
                    .then(data=>{
                        UrlPicturesOfProduct.create({productId: data.dataValues.id, url: url1})
                        UrlPicturesOfProduct.create({productId: data.dataValues.id, url: url2})
                        UrlPicturesOfProduct.create({productId: data.dataValues.id, url: url3})
                    })
                    sendDataToAlgolia()
                    res.status(201).send({message: "Le produit à été ajouté avec succès."})
                }
            })
        }catch(e){
            res.status(400).send({message: "Error :"+e})
        }
    }
} 

exports.findAllByCategory = (req, res)=>{
    try{
        const category = req.params.category;
        Product.findAll({where: {category: category}})
        .then(products=>{
            if(products){
                res.status(200).json({products: products})
            }else{
                res.status(404).send({message: "Aucun produit avec cette catégorie n'as été trouvé."})
            }
        })
    }catch(e){
        res.status(400)
    }
} 

exports.findAll = (req, res)=>{
    try{
        Product.findAll({})
        .then(data=>{
            res.status(200).json({data})
        })
    }catch(e){
        res.status(400).send({message : 'Erreur :'+e})
    }
}

exports.findOne = (req, res)=>{
    try{
        const id = req.params.id;
        Product.findOne({raw:true, where: {id: id}})
        .then(product=>{
            if(product){
                Size.findAll({raw: true, where:{productId: id}}) 
                .then(size=>{
                    UrlPicturesOfProduct.findAll({where: {productId: id}})
                    .then(pictures=>{
                        res.status(200).json({product: product, size: size, pictures})
                    })
                })
            }else{
                res.status(400).send({message: "Aucun article trouvé. désolé."})
            }
        })
    }catch(e){
        res.status(400).send({message: "Error : "+e})
    }
}

exports.getNovelty = (req, res)=>{
    try{
        Product.findAll({raw: true, where : {novelty: true}})
        .then(products=>{
            if(products){
                res.status(200).json({products})
            }else{
                res.status(404).send({message: "Sorry, any novelty..."})
            }
        })
    }catch(e){
        res.status(500).send({message: "Error : "+e})
    }
}

exports.update = (req, res)=>{
    try{
        const name = req.body.name;
        const environment = req.body.environment;
        const category = req.body.category;
        const description = req.body.description;
        const priceTTC = req.body.priceTTC;
        const novelty = req.body.novelty; 
        const color = req.body.color;
        const id = req.params.id;
        Product.update({name, environment, category, description, priceTTC, novelty, color}, {where: {id: id}})
        .then(product=>{
            res.status(200).send({message: "Le produit à bien été mis à jour."})
        })
    }catch(e){
        res.status(400).send({message: "Error : "+e})
    }
}
 
exports.delete = (req, res)=>{
    try{
        const id = req.params.id;
        Product.destroy({where:{id: id}})
        .then(deleted=>{
            if(deleted == 0){
                res.status(400).send({message: "Aucun article n'as été supprimé car une erreur est survenue (article probablement déjà supprimé..)."})
            }else{
                res.status(200).send({message: "Le produit à bien été supprimé."})
            }
        })
    }catch(e){
        res.status(400).send({message: "Erreur : "+e})
    }
}

exports.updateSize= (req, res)=>{
    try{
        if(!req.body.newSize){
            return res.status(400).send({message: "Vous devez impérativement choisir la nouvelle taille pour modifier l'ancienne."})
        } 
        const productId = req.params.id;
        const size = req.body.size;
        const newSize = req.body.newSize 
        Size.update({size: newSize}, {where: {productId: productId, size: size}})
        .then(updated=>{
            if(updated[0] == 0){
                res.status(400).send({message: "Aucun article trouvé avec cet Id ou cette taille. Rien n'as été mis à jour."})
            }else{
                res.status(200).send({message: "Taille mise à jour avec succès !"})
            }
        })
    }catch(e){
        res.status(400).send({message: "Une ereur à été détecté :"+e})
    }
}

exports.addSize = (req, res)=>{
    try{
        const productId = req.params.id;
        const size = req.body.size;
        Size.findOne({raw: true, where: {productId: productId, size: size}})
        .then(data=>{
            if(data){
                res.status(400).send({message: "Vous ne pouvez pas créer deux même tailles  pour un même produit. Veuillez le mettre simplement à jour ou le supprimer."})
            }else{
                Size.create({productId, size})
                res.status(200).send({message: "La taille à bien été créé."})
            }
        })
    }catch(e){
        res.status(400).send({message: "Erreur :"+e})
    }
}

exports.getImages = (req, res)=>{
    try{
        const id = req.params.id;
        UrlPicturesOfProduct.findAll({where: {productId: id}})
        .then(pictures=>{
            if(pictures){
                res.status(200).json(pictures)
            }else{
                res.status(400).send({message: "Aucune photo pour ce produit."})
            }
        })
    }catch(e){
        res.status(400).send({message: 'Erreur: '+e})
    }
}

