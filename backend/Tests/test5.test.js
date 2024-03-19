const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');

describe('Test 2', () => {
    let products;

    beforeEach(async () => {
        const html = fs.readFileSync('./Tests/webstie_to_test/klawiatura.html', 'utf8'); 
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
    });

    it('nazwa nie powinna zawierać określonych słów', () => {
        const forbiddenWords = ["Polecany", "Promocja", "Bestseller", "undefined", "null", "NaN", "brak"];
        for (let i = 0; i < products.length; i++) {
            const productName = products[i].name.toLowerCase(); 
            for (let j = 0; j < forbiddenWords.length; j++) {
                expect(productName).not.toContain(forbiddenWords[j].toLowerCase()); 
            }
        }
    });
});
