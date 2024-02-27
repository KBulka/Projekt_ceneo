const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const Product = require('./database/models/Product.js');
const SearchInput = require('./database/models/SearchInput.js');
const { Op } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const searchInput = req.body.searchInput;
    res.send(await getProducts(searchInput));
});

const getProducts = async (searchInput) => {
    const response = await axios.get(`https://www.ceneo.pl/szukaj-${searchInput}`);
    const dom = new JSDOM(response.data);
    const elements = dom.window.document.getElementsByClassName('cat-prod-row');
    const productCount = elements.length;
    const products = [];
    for (let i = 0; i < productCount; i++) {
        const cena = elements[i].getElementsByClassName('price')[0];
        if(elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original') === null)
        {
            products.push({
                name: elements[i].getElementsByClassName('cat-prod-row__name')[0].getElementsByTagName('span')[0].innerHTML,
                price: cena.getElementsByClassName('value')[0].innerHTML + cena.getElementsByClassName('penny')[0].innerHTML,
                imgURL: elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('src'),
                productURL: 'https://www.ceneo.pl/'+elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('a')[0].getAttribute('href'),
                category: elements[i].getElementsByClassName('cat-prod-row__category')[0].getElementsByTagName('a')[0].innerHTML
            })
        }else{
            products.push({
                name: elements[i].getElementsByClassName('cat-prod-row__name')[0].getElementsByTagName('span')[0].innerHTML,
                price: cena.getElementsByClassName('value')[0].innerHTML + cena.getElementsByClassName('penny')[0].innerHTML,
                imgURL: elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('img')[0].getAttribute('data-original'),
                productURL: 'https://www.ceneo.pl/'+elements[i].getElementsByClassName('cat-prod-row__foto')[0].getElementsByTagName('a')[0].getAttribute('href'),
                category: elements[i].getElementsByClassName('cat-prod-row__category')[0].getElementsByTagName('a')[0].innerHTML
            })
        }
    }
    return products;
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
