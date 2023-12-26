import Post from '../models/postModel.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const post = async (req, res) => {

    // WORK IN PROGRESS
    // const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // console.log(await User.findById(decoded.userId));

    const { message, profileName, userId } = req.body;

    if (!message || !profileName)
        return res.status(400).send({ message: "empty input field" });

    try {
        await Post.create({
            userId,
            profileName,
            postContent: message
        });
        res.status(200).send({ message: "Message has been posted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "something went wrong" });
    };
};

const get = async (req, res) => {

    try {
        const posts = await Post.find({});
        res.status(200).send(posts);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};

export { post, get };