const request = require('supertest');
const app = require('./server');

describe('API Tests', () => {
    let server;
    let userId;

    // Start the server before all tests
    beforeAll(() => {
        server = app.listen(5000);
    });

    // Close the server after all tests
    afterAll((done) => {
        server.close(done);
    });

    // Test GET /welcome
    it('should return welcome message', async() => {
        const res = await request(app).get('/welcome');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Welcome to Express!');
    });

    // Test POST /users
    it('should create a new user', async() => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@example.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        userId = res.body.id; // Save the user ID for later tests
    });

    // Test GET /users
    it('should get all users', async() => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test PUT /users/:id
    it('should update a user', async() => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Jane Doe');
    });

    // Test DELETE /users/:id
    it('should delete a user', async() => {
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.statusCode).toEqual(204);
    });
});