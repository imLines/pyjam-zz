const express = require('express');
const app = express();
const cors = require('cors');
const { sendDataToAlgolia } = require('./algolia/updateAlgoliaDatabase');


const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || "8000";
app.use(cors())

 

require('dotenv').config()
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))




app.listen(port, ()=>{
    console.log(`Listening to requests on http://localhost:${port}`)
});

  
//Models
require('./models/customer.model');
require('./models/payment.model');
require('./models/order.model');
require('./models/product.model');
require('./models/size.model');
require('./models/delivery.model');
require('./models/relations.model');
require('./models/wishList.model');
require('./models/orderDetails.model');
require('./models/wishList.model');
require('./models/admin.model');
require('./models/urlPicturesOfProduct.model');

//Routes
require('./routes/customer.routes')(app);
require('./routes/productAndSize.routes')(app);
require('./routes/delivery.routes')(app);
require('./routes/purchase.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/security.routes')(app);
require('./routes/wishList.routes')(app);


//AlgoliaInit
// sendDataToAlgolia()



const {sequelize} = require('./models/model');
sequelize.sync({force: false, alter: false})
.then(()=>{
    console.log('Success Sync DB Pyjamzz.');
})
.catch((err)=>{
    console.log("Failed to sync with DB: "+err);
});  