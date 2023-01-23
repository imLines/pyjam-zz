const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Payment = sequelize.define("payment", {
    amount: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    }
    //THE ORDER ID CAN BE NULL FOR INITIALIZATION BEFORE 
});

module.exports = Payment;