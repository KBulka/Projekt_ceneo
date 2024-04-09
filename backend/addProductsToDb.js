const Product = require('./database/models/Product');

async function addProductsToDb(products, cachename) {
    
    const productCount = products.length;
    for (let i = 0; i < productCount; i++) {
        const productFromDB = await Product.cache(cachename).findOne({
            where: {
                name: products[i].name
            }
        });
        
        if (productFromDB) {
            console.log("Dodaje produkt do bazy danych | "+products[i].name)
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
            const p = await Product.cache().findByPk(productFromDB.id);
            await p.cache().update({
                price: products[i].price
            });
        }
    }
    await Product.cache(cachename).clear();
};

module.exports = { addProductsToDb };