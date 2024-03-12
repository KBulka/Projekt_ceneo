const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getProducts } = require('./getProducts.js');
const { getProductsCeneo } = require('./getProductsCeneo'); 
const { updateAllSearches } = require('./updateAllSearches');
const {checkSearchInput} = require('./checkSearchInput');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const searchInput = req.body.searchInput;
    if(checkSearchInput(searchInput) === false)
    {
        res.send('Search input is too short');
        return;
    }
    res.send(await getProducts(searchInput));
});

app.post('/getProductsCeneo', async (req, res) => {
    const searchInput = req.body.searchInput;
    if(checkSearchInput(searchInput) === false)
    {
        res.send('Search input is too short');
        return;
    }
    res.send(await getProductsCeneo(searchInput));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// //update all products every 10 minutes
// setInterval(() => {
//     console.log('updating all searches');
//     updateAllSearches();
// }, 1000*10*60);