import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';
import request from "supertest";
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import Vote from '../models/voteModel.js';


dotenv.config();

describe('/api/posts/vote', () => {

    let user;
    let post;
    let secondPost;
    let comment;
    let vote;
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

        comment = await Comment.create({
            postId: post._id,
            userId: user._id,
            profileName: user.username,
            commentContent: 'placeholder'
        });

        const voteOption = 'upvote'
        vote = await Vote.create({
            postId: secondPost._id,
            userId: [{ userId: user._id, voteOption }],
            votesCount: voteOption === 'upvote' ? 1 : -1
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Create and update a vote in db', () => {
        it('should response with status code 401', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'upvote';

            const userId = '65a1420b2d6a69e7ccb54f4g' // if user id faked in local storage

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('unauthorized');
            expect(response.status).toBe(401);
        });

        it('should response with status code 404', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'upvote';

            const postId = '65a143aa82e5be07c0fc0452'

            const response = await request(app).post('/api/posts/vote').send({
                postId,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Post was not found');
            expect(response.status).toBe(404);
        });

        it('should response with status code 201', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'upvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was created');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(1);
            expect(response.status).toBe(201);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'upvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received unvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(0);
            expect(response.status).toBe(202);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'downvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received downvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(-1);
            expect(response.status).toBe(202);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'upvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received upvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(1);
            expect(response.status).toBe(202);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'downvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received downvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(-1);
            expect(response.status).toBe(202);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const voteOption = 'downvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received unvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(0);
            expect(response.status).toBe(202);
        });

        it('should response with status code 202', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user2@user.com', password: '123User!' });

            const voteOption = 'downvote';

            const response = await request(app).post('/api/posts/vote').send({
                postId: post._id,
                userId: user.body.userId,
                voteOption
            }).set('Cookie', user.header['set-cookie']);
            expect(response.body.message).toStrictEqual('Vote was received downvote');
            expect((await Vote.find({ postId: post._id }))[0].votesCount).toBe(-1);
            expect((await Vote.find({ postId: post._id }))[0].userId).toHaveLength(2);
            expect(response.status).toBe(202);
        });
    });

    describe('Get a vote from db', () => {
        it('should response with status code 200', async () => {
            const user = await request(app).post('/api/users/auth').send({ email: 'user@user.com', password: '123User!' });

            const response = await request(app).get(`/api/posts/vote?postId=${secondPost._id}`).set('Cookie', user.header['set-cookie']);
            expect(response.status).toBe(200);
        });
    });
});