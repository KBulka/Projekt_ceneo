const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Op } = require('sequelize');
const Product = require('./database/models/Product.js');
const SearchInput = require('./database/models/SearchInput.js');
const { getProducts } = require('./getProducts.js');
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
    const productCount = elements.length;
    const products = [];
    for (let i = 0; i < productCount; i++) {
        const cena = elements[i].getElementsByClassName('price')[0];
        const imgURL = elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original') === null ?
            elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('src') :
            elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original');
        const price = Number((cena.getElementsByClassName('value')[0].innerHTML + cena.getElementsByClassName('penny')[0].innerHTML).replace(',', '.').replace(' ', ''));
        const productURL = 'https://www.ceneo.pl/' + elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('a')[0].getAttribute('href');
        const category = elements[i].getElementsByClassName('cat-prod-row__category')[0].getElementsByTagName('a')[0].innerHTML;
        const name = elements[i].getElementsByClassName('cat-prod-row__name')[0].getElementsByTagName('span')[0].innerHTML;
        products.push({
            name: name,
            price: price,
            imgURL: imgURL,
            productURL: productURL,
            category: category
        });
    }
    // return products;

    //check if the product is already in the database
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

    //finally, return the products from the database
    return await getProducts(searchInput);
}

module.exports =  {getProductsCeneo} ;