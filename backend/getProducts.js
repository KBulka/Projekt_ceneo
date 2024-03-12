const Product = require('./database/models/Product');
const { Op } = require('sequelize');

const getProducts = async (searchInput) => {
    const products = await Product.cache(`search-${searchInput}`).findAll({
        where: {
            name: {
                [Op.like]: `%${searchInput}%`
            }
        }
    });
    return products;
}

module.exports = {getProducts};