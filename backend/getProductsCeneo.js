const axios = require('axios');
const { JSDOM } = require('jsdom');
const SearchInput = require('./database/models/SearchInput.js');
const { getProducts } = require('./getProducts.js');
const {addProductsToDb} = require('./addProductsToDb.js');
const { catProdRowsToArray } = require('./catProdRowsToArray.js');

const getProductsCeneo = async (searchInput) => {
    let page = 0;
    //check if the searchInput is already in the database
    const searchInputFromDB = await SearchInput.findOne({
        where: {
            searchInput: searchInput,
        }
    });
    if (searchInputFromDB === null) {
        await SearchInput.create({
            searchInput: searchInput
        });
    }
    else
    {
        await searchInputFromDB.increment('page');
        page = searchInputFromDB.page;
        console.log('Page: ' + page);
    }
    const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
    console.log(searchInput)
    try {
    const response = await axios.get(`https://www.ceneo.pl/szukaj-${searchInput};0020-30-0-0-${page}.htm`, 
    {
        headers: headers
    });
        const dom = new JSDOM(response.data);

        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        const products = await catProdRowsToArray(elements)
        await addProductsToDb(products, searchInput);
    }
    catch (error) {
        console.log(error)
    }
    return await getProducts(searchInput);

}

module.exports =  {getProductsCeneo} ;