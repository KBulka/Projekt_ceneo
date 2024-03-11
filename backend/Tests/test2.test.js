const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');


describe('Test 2', () => {
    let products;

    beforeEach(async () => { // <-- inicjalizuje dane przed wykonaniem testów
        const html = fs.readFileSync('./Tests/webstie_to_test/mysz.html', 'utf8');
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
    });

    it('Każdy produkt powinien mieć imgURL', () => {
        for (let i = 0; i < products.length; i++) {
            expect(products[i].imgURL).toBeDefined();
            expect(products[i].imgURL).not.toBeNull();
            expect(products[i].imgURL).not.toBe('');
        }
    });

    it('Każdy produkt powinien mieć productURL', () => {
        for (let i = 0; i < products.length; i++) {
            expect(products[i].productURL).toBeDefined();
            expect(products[i].productURL).not.toBeNull();
            expect(products[i].productURL).not.toBe('');
        }
    });
});