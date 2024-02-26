const axios = require('axios');
const {XMLParser} = require('fast-xml-parser'); 
const {readFileSync} = require('fs');
const express = require('express');
const { JSDOM } = require('jsdom');

const app = express();

app.get('/', async (req, res) => {
    res.send(await getProducts());
});

const getProducts = async () => {
    const response = await axios.get("https://www.ceneo.pl/Rowery_i_akcesoria;szukaj-rower");
    const dom = new JSDOM(response.data);
    const elements = dom.window.document.getElementsByClassName('cat-prod-row');
    const productCount = elements.length;
    const products = [];
    for(let i = 0; i < productCount; i++) {
        const cena = elements[i].getElementsByClassName('price')[0];
        products.push({
            name: elements[i].getElementsByClassName('cat-prod-row__name')[0].getElementsByTagName('span')[0].innerHTML,
            price: cena.getElementsByClassName('value')[0].innerHTML+cena.getElementsByClassName('penny')[0].innerHTML
        });
    }
    return products;
}
(async () => {
    console.log(await getProducts());
})();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});