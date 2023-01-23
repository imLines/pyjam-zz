const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    environment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT ,
        allowNull: false
    },
    priceTTC: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false
    },
    novelty: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }, 
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Product;