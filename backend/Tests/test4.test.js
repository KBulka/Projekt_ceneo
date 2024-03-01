// sprawdza czy klasa "Product" jest prawidłowo zdefiniowana i synchronizowana z bazą danych

const { Product } = require('../database/models');

describe('Testowanie modelu Product', () => {
    it('powinno zwrócić prawidłowe właściwości dla nowego produktu', () => {
        const product = Product.build({
            name: 'Laptop',
            price: 999.99,
            imgURL: 'https://example.com/laptop.jpg',
            productURL: 'https://example.com/laptop',
            category: 'Electronics'
        });

        expect(product).toHaveProperty('name', 'Laptop');
        expect(product).toHaveProperty('price', 999.99);
        expect(product).toHaveProperty('imgURL', 'https://example.com/laptop.jpg');
        expect(product).toHaveProperty('productURL', 'https://example.com/laptop');
        expect(product).toHaveProperty('category', 'Electronics');
    });
});
