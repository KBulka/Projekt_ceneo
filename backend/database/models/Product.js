const sequelize = require('../database.js').sequelize;
const { DataTypes, Model } = require('sequelize');
const withCache = require('../withCache').withCache;

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    imgURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, { 
    sequelize, 
    modelName: 'product' 
});

Product.sync();

module.exports = withCache(Product);