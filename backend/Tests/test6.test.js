const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');

describe('Test 6', () => {
    let products;

    beforeEach(async () => {
        const html = fs.readFileSync('./Tests/webstie_to_test/klawiatura.html', 'utf8');
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
    });

    it('Nazwa każdego produktu nie powinna być pusta ani null', () => {
        for (let i = 0; i < products.length; i++) {
            expect(products[i].name).toBeDefined();
            expect(products[i].name).not.toBeNull();
            expect(products[i].name).not.toBe('');
        }
    });
});