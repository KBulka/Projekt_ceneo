const Product = require('./database/models/Product');

async function addProductsToDb(products) {
    const productCount = products.length;
    for (let i = 0; i < productCount; i++) {
        const productFromDB = await Product.findOne({
            where: {
                name: products[i].name
            }
        });
        if (productFromDB === null) {
            await Product.create({
                name: products[i].name,
                price: products[i].price,
                imgURL: products[i].imgURL,
                productURL: products[i].productURL,
                category: products[i].category
            });
        }
        else
        {
            await Product.update({
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