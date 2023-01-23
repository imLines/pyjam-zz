const {sequelize} = require('./model');

const WishList = sequelize.define('wishlist');

module.exports = WishList; 