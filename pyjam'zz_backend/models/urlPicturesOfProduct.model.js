const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const UrlPicturesOfProduct = sequelize.define('url pictures of products', {
    url : {
        type: DataTypes.TEXT,
    }
});

module.exports = UrlPicturesOfProduct; 