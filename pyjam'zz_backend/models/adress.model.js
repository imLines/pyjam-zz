const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Adress = sequelize.define('adress', {
    adress: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    adressComplement: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postalAdress: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Adress;