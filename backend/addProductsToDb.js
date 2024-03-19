const Product = require('./database/models/Product');

async function addProductsToDb(products, cachename) {
    const productCount = products.length;
    for (let i = 0; i < productCount; i++) {
        const productFromDB = await Product.cache(cachename).findOne({
            where: {
                name: products[i].name
            }
        });
        if (productFromDB === null) {
            await Product.cache(cachename).create({
                name: products[i].name,
                price: products[i].price,
                imgURL: products[i].imgURL,
                productURL: products[i].productURL,
                category: products[i].category
            });
        }
        else
        {
            await Product.cache(cachename).update({
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