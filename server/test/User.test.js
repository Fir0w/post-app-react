import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';
import request from "supertest";
import User from '../models/userModel.js';


dotenv.config();

describe('/api/users', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await User.create(
            { username: 'user', email: 'user@user.com', password: '123User!' }
        );
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should response with staus code 202 for correctly authenticated user', async () => {

        const response = await request(app).post('/api/users/auth').send(
            { email: 'user@user.com', password: '123User!' }
        );

        expect(response.statusCode).toBe(202);
    });

    it('should response with staus code 401 if user doesnt exist or data is wrong', async () => {

        const response = await request(app).post('/api/users/auth').send(
            { email: 'use@user.com', password: '123User' }
        );
        expect(response.statusCode).toBe(401);
    });

    it('should response with staus code 201 for correctly created user', async () => {

        const response = await request(app).post('/api/users/').send(
            { username: 'user', email: 'user2@user.com', password: '123User!' }
        );
        expect(response.statusCode).toBe(201);
    });

    it('should response with staus code 400 if user exists', async () => {

        const response = await request(app).post('/api/users/').send(
            { username: 'user', email: 'user@user.com', password: '123User!' }
        );
        expect(response.statusCode).toBe(400);
    });

    it('should response with staus code 400 if data is wrong', async () => {

        const response = await request(app).post('/api/users/').send(
            { username: 'user', email: 'user@user.com', password: '123User' }
        );
        expect(response.statusCode).toBe(400);
    });

    it('should response with staus code 200 if user logged out', async () => {

        const response = await request(app).post('/api/users/logout');
        expect(response.statusCode).toBe(200);
        expect(response.headers['set-cookie']).toStrictEqual(['jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly']);
    });

    it('should response with staus code 202 if user the avatar changed correctly', async () => {

        const userResponse = await request(app).post('/api/users/auth').send(
            { email: 'user@user.com', password: '123User!' }
        );

        const response = await request(app).put('/api/users/updateAvatar').send({
            req: {
                body: { index: 1 },
                user: { _id: `${userResponse.body.userId}` }
            }
        }).set('Cookie', userResponse.header['set-cookie']);
        expect(response.statusCode).toBe(202);
    });

    it('should response with staus code 202 if user was queried correctly', async () => {

        const userResponse = await request(app).post('/api/users/auth').send(
            { email: 'user@user.com', password: '123User!' }
        );

        const profileName = userResponse.body.username;

        const response = await request(app).get(`/api/users/user?username=${profileName}`);
        expect(response.statusCode).toBe(202);
    });
});