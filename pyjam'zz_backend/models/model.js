const Sequelize  = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:8889/pyjamzz');

module.exports = {sequelize}; 