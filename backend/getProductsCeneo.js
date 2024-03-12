const axios = require('axios');
const { JSDOM } = require('jsdom');
const SearchInput = require('./database/models/SearchInput.js');
const { getProducts } = require('./getProducts.js');
const {addProductsToDb} = require('./addProductsToDb.js');
const { catProdRowsToArray } = require('./catProdRowsToArray.js');

const getProductsCeneo = async (searchInput) => {
    //check if the searchInput is already in the database
    const searchInputFromDB = await SearchInput.findOne({
        where: {
            searchInput: searchInput
        }
    });
    if (searchInputFromDB === null) {
        await SearchInput.create({
            searchInput: searchInput
        });
    }
    
    const response = await axios.get(`https://www.ceneo.pl/szukaj-${searchInput}`);
    const dom = new JSDOM(response.data);

    const elements = dom.window.document.getElementsByClassName('cat-prod-row');
    const products = await catProdRowsToArray(elements)
    await addProductsToDb(products);

    return await getProducts(searchInput);
}

module.exports =  {getProductsCeneo} ;