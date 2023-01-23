const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Order = sequelize.define('order', {
    orderNumber: {
        type: DataTypes.INTEGER,
        unique: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    deliveryAdress: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Order;