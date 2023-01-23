const {sequelize} = require('./model');
const {DataTypes} = require('sequelize');

const Size = sequelize.define('size', {
    size: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Size; 