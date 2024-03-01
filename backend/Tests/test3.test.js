// prosty test, który sprawdza czy aplikacja zwróci kod 200 w odpowiedzi na żądanie GET dla domyślnego endpointu

const request = require('supertest');
const app = require('../index');

describe('testowanie backendu', () => {
    it('Powinno zwrócić status 200 dla żądania GET', async () => {
        const response = await request(app)
            .get('/');

        expect(response.status).toBe(200);
    });
});
