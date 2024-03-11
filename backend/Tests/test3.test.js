const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');


describe('Test 3', () => {
    let products;

    beforeEach(async () => {
        const html = fs.readFileSync('./Tests/webstie_to_test/klawiatura.html', 'utf8'); 
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
    });

    it('Każdy atrybut danego produktu powinien posiadać prawidłowy typ danych', () => {
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            expect(typeof product.name).toBe('string');
            expect(typeof product.price).toBe('number');
            expect(typeof product.imgURL).toBe('string');
            expect(typeof product.productURL).toBe('string');
            expect(typeof product.category).toBe('string');
        }
    });
});