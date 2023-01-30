const algoliasearch = require('algoliasearch');
const Product = require('../models/product.model');


exports.sendDataToAlgolia = ()=>{
    try{
        const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
        const index = client.initIndex('products');
        index.clearObjects();
        Product.findAll()
        .then(products=>{
            if(products){
                index.saveObjects(products, { autoGenerateObjectIDIfNotExist: true });
                console.log('Save in Algolia')
            }else{
                console.log("Can't save in algolia")
            }
        })
    }catch(e){
        console.log(e)
    }
}