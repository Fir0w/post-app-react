import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';
import request from "supertest";
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';


dotenv.config();

describe('/api/posts', () => {

    let user;
    let post;
    let secondPost;
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

        secondPost = await Post.create({
            userId: user._id,
            profileName: user.username,
            postContent: 'placeholder'
        });

        await Comment.create({
            postId: secondPost._id,
            userId: user._id,
            profileName: user.username,
            commentContent: 'placeholder'
        });

        await Comment.create({
            postId: secondPost._id,
            userId: user._id,
            profileName: user.username,
            commentContent: 'placeholder'
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Create a post in db', () => {
        it('should response with status code 400 (empty message)', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).post('/api/posts/').send({ message: '' }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('empty input field');
            expect(response.statusCode).toBe(400);
        });

        it('should response with status code 201', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).post('/api/posts/').send({ message: 'test' }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Message has been posted');
            expect(response.status).toBe(201);
        });
    });

    describe('Get a post from db', () => {
        it('should response with status code 200 and one post', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).get(`/api/posts/?postId=${post._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.body).toHaveLength(1);
            expect(response.statusCode).toBe(200);
        });

        it('should response with status code 200 and all posts', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).get('/api/posts').set('Cookie', user.header['set-cookie']);
            expect(response.body).toHaveLength(3);
            expect(response.statusCode).toBe(200);
        });

        it('should response with status code 500 if post does not exist', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const postId = 'test'

            const response = await request(app).get(`/api/posts/?postId=${postId}`).set('Cookie', user.header['set-cookie']);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('Delete a post from db', () => {
        it('should response with status code 403', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user2@user.com', password: '123User!' });

            const response = await request(app).delete(`/api/posts/?postId=${post._id}&userId=${post.userId}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Forbidden');
            expect(response.statusCode).toBe(403);
        });

        it('should response with status code 200', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            expect(await Post.find({ '_id': post._id })).toHaveLength(1);
            const response = await request(app).delete(`/api/posts/?postId=${post._id}&userId=${post.userId}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Post was deleted');
            expect(response.statusCode).toBe(200);
            expect(await Post.find({ '_id': post._id })).toHaveLength(0);
        });

        it('should response with status code 200', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            expect(await Comment.find({ 'postId': secondPost._id })).toHaveLength(2);
            expect(await Post.find({ '_id': secondPost._id })).toHaveLength(1);
            const response = await request(app).delete(`/api/posts/?postId=${secondPost._id}&userId=${secondPost.userId}`).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Post was deleted');
            expect(response.statusCode).toBe(200);
            expect(await Post.find({ '_id': secondPost._id })).toHaveLength(0);
            expect(await Comment.find({ 'postId': secondPost._id })).toHaveLength(0);
        });
    });
});