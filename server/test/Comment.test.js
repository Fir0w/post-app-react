import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';
import request from "supertest";
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';


dotenv.config();

describe('/api/comments', () => {

    let user;
    let post;
    let comment;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        user = await User.create(
            { username: 'user', email: 'user@user.com', password: '123User!' }
        );

        await User.create(
            { username: 'secondUser', email: 'user2@user.com', password: '123User!' }
        );

        post = await Post.create({
            userId: user._id,
            profileName: user.username,
            postContent: 'placeholder'
        });

        comment = await Comment.create({
            postId: post._id,
            userId: user._id,
            profileName: user.username,
            commentContent: 'placeholder'
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Create a comment in db', () => {
        it('should response with status code 201', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).post(`/api/comments?postId=${post._id}`).send({ message: 'test' }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Comment has been created');
            expect((await Post.findById(post._id)).commentsCount).toBe(1);
            expect(response.status).toBe(201);
        });

        it('should response with status code 400 (empty message)', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).post('/api/comments').send({ message: '' }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('empty input field');
            expect(response.statusCode).toBe(400);
        });

        it('should response with status code 500', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).post('/api/comments').send({ message: 'test' }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Internal Server Error');
            expect(response.status).toBe(500);
        });
    });

    describe('Get all comments from db', () => {
        it('should response with status code 200', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).get(`/api/comments?postId=${post._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.body).toHaveLength(2);
            expect(response.status).toBe(200);
        });

        it('should response with status code 200 but zero comments', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const postId = null

            const response = await request(app).get(`/api/comments?postId=${postId}`).set('Cookie', user.header['set-cookie']);
            expect(response.body).toHaveLength(0);
        });
    });

    describe('Delete a comment from db', () => {
        it('should response with status code 200', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            expect((await Post.findById(post._id)).commentsCount).toBe(1);
            const response = await request(app).delete(`/api/comments/?commentId=${comment._id}&userId=${user.body.userId}&postUserId=${post.userId}&postId=${post._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Comment was deleted');
            expect((await Post.findById(post._id)).commentsCount).toBe(0);
            expect(response.statusCode).toBe(200);
        });

        it('should response with status code 403', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user2@user.com', password: '123User!' });

            const response = await request(app).delete(`/api/comments/?commentId=${comment._id}&userId=${user.body.userId}&postUserId=${post.userId}&postId=${post._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Forbidden');
            expect(response.statusCode).toBe(403);
        });

        it('should response with status code 404', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const commentId = '65a131151dfeb245ad2d145c'

            const response = await request(app).delete(`/api/comments/?commentId=${commentId}&userId=${user.body.userId}&postUserId=${post.userId}&postId=${post._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Resource was not found');
            expect(response.statusCode).toBe(404);
        });
    });
});