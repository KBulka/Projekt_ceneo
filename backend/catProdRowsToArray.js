const { catProwRodToProduct } = require("./catProdRowToProduct");

async function catProdRowsToArray(elements) {
    const productCount = elements.length;
    const products = [];
    for (let i = 0; i < productCount; i++) {
        products.push(catProwRodToProduct(elements[i]));
    }
    return products;
}

module.exports = { catProdRowsToArray };