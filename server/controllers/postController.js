import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';


const createPost = async (req, res) => {

    const { message } = req.body;

    if (!message)
        return res.status(400).send({ message: "empty input field" });

    try {
        await Post.create({
            userId: req.user._id,
            profileName: req.user.username,
            postContent: message
        });
        res.status(200).send({ message: "Message has been posted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "something went wrong" });
    };
};

const getPost = async (req, res) => {

    try {
        const posts = await Post.find(req.query.postId ? { '_id': req.query.postId } : {});
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};

const deletePost = async (req, res) => {

    if (req.query.userId !== req.user._id.toString())
        return res.status(500).send({ message: "something went wrong" });

    try {
        await Post.deleteOne({ '_id': req.query.postId });
        await Comment.deleteMany({ 'postId': req.query.postId });
        res.status(200).send({ message: "Post was deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};


export { createPost, getPost, deletePost };