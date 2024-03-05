const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getProducts } = require('./getProducts.js');
const { getProductsCeneo } = require('./getProductsCeneo'); 
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const searchInput = req.body.searchInput;
    res.send(await getProducts(searchInput));
});

app.post('/getProductsCeneo', async (req, res) => {
    const searchInput = req.body.searchInput;
    res.send(await getProductsCeneo(searchInput));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
