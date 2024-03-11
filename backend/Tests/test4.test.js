const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');
const { isURL } = require('validator'); // Biblioteka użyta w celu sprawdzenia poprawności URL

describe('Test 4', () => {
    let products;

    beforeEach(async () => {
        const html = fs.readFileSync('./Tests/webstie_to_test/klawiatura.html', 'utf8'); 
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
    });

    it('Każdy produkt powinien mieć poprawny URL, zaczynający się od protokołu https', () => {
        for (let i = 0; i < products.length; i++) {
            expect(isURL(products[i].productURL, { protocols: ['https'], require_protocol: true })).toBe(true);
        }
    });
});