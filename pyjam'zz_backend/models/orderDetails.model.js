const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const OrderDetails = sequelize.define('order details');

module.exports = OrderDetails; 