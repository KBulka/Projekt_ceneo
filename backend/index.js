const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { JSDOM } = require('jsdom');

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
        products.push({
            name: elements[i].getElementsByClassName('cat-prod-row__name')[0].getElementsByTagName('span')[0].innerHTML,
            price: cena.getElementsByClassName('value')[0].innerHTML + cena.getElementsByClassName('penny')[0].innerHTML
        });
    }
    return products;
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
