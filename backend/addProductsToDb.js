const Product = require('./database/models/Product');

async function addProductsToDb(products) {
    const productCount = products.length;
    for (let i = 0; i < productCount; i++) {
        const productFromDB = await Product.cache().findOne({
            where: {
                name: products[i].name
            }
        });
        if (productFromDB === null) {
            await Product.cache().create({
                name: products[i].name,
                price: products[i].price,
                imgURL: products[i].imgURL,
                productURL: products[i].productURL,
                category: products[i].category
            });
        }
        else
        {
            await Product.cache().update({
                price: products[i].price
            }, {
                where: {
                    name: products[i].name
                }
            });
        }
    }
};

module.exports = { addProductsToDb };