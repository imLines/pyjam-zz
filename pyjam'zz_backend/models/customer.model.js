const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Customer = sequelize.define("customer", {
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validate: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    tokenValidate: {
        type: DataTypes.TEXT
    }
});

module.exports = Customer;