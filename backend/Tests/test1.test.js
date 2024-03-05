const fs = require('fs');
const { JSDOM } = require('jsdom');
const { catProdRowsToArray } = require('../catProdRowsToArray');

describe('Test 1', () => {
    let products;
    it('powinno zwrócić 30 produktów', async () => {
        const html = fs.readFileSync('./Tests/webstie_to_test/kamera.html', 'utf8');
        const dom = new JSDOM(html);
        const elements = dom.window.document.getElementsByClassName('cat-prod-row');
        products = await catProdRowsToArray(elements);
        expect(products.length).toBe(30);
    }); 
    it('cena nie powinna być pusta lub null', () => {
        for (let i = 0; i < products.length; i++) {
            expect(products[i].price).not.toBe(null);
            expect(products[i].price).not.toBe('');
        }
    }
    );
    it('cena powinna być liczbą', () => {
        for (let i = 0; i < products.length; i++) {
            expect(typeof products[i].price).toBe('number');
        }
    });
    it('nazwa nie powinna zawwierac slow', () => {
        let slowa = ["Polecany", "Promocja", "Bestseller", "undefined", "null", "NaN", "brak"];
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < slowa.length; j++) {
                expect(products[i].name).not.toContain(slowa[j]);
            }
        }
    });
});