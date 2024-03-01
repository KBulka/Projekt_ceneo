// sprawdza czy API zwraca oczekiwane dane na żądanie POST (tylko 1 produkt)

const request = require('supertest');
const app = require('../index');

describe('testowanie backendu', () => {
    it('Powinno zwrocić produkty na podstawie zapytania', async () => {
        const response = await request(app)
            .post('/')
            .send({ searchInput: 'laptop' });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('price');
        expect(response.body[0]).toHaveProperty('imgURL');
        expect(response.body[0]).toHaveProperty('productURL');
        expect(response.body[0]).toHaveProperty('category');
    });
});