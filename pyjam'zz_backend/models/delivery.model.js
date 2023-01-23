const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Delivery = sequelize.define('delivery', {
    deliveryPrice: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Delivery; 