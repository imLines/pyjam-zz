const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Admin = sequelize.define('admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Admin;