const Customer = require('./customer.model');
const Payment = require('./payment.model');
const Order = require('./payment.model');
const Delivery = require('./delivery.model');
const Product = require('./product.model');
const Size = require('./size.model');
const WishList = require('./wishList.model');
const OrderDetails = require('./orderDetails.model');
const UrlPicturesOfProduct = require('./urlPicturesOfProduct.model');

//Customer
Customer.hasOne(WishList);
WishList.belongsTo(Customer);

Customer.hasMany(Payment);
Payment.belongsTo(Customer);

Customer.hasMany(Order);
Order.belongsTo(Customer);


//Order
Delivery.hasMany(Order);
Order.belongsTo(Delivery);

Order.hasOne(Payment);
Payment.belongsTo(Order);

Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);


//OrderDetails
Product.hasMany(OrderDetails);
OrderDetails.belongsTo(Product);

//WishList
Product.hasMany(WishList);
WishList.belongsTo(Product);


//Product with stock
Product.hasMany(Size);
Size.belongsTo(Product);

//Product with urlPictures
Product.hasMany(UrlPicturesOfProduct);
UrlPicturesOfProduct.belongsTo(Product);