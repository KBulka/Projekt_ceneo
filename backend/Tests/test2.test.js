// sprawdza czy w polu wyszukiwania jest jakaś wartość

const request = require('supertest');
const app = require('../index');

describe('testowanie backendu', () => {
    it('Powinno zwrócić błąd przy braku danych w zapytaniu', async () => {
        const response = await request(app)
            .post('/')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Brak danych w zapytaniu');
    });
});
