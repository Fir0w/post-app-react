import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';


// @desc This API Creates a Post in DB
// route POST /api/posts/
// @accesss Private
// @returns {object} 201 - Returns an object that returns a message "Message has been posted"
// @returns {object} 400 - Returns an object that returns a message "empty input field"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
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
        res.status(201).send({ message: "Message has been posted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc This API Get all Posts from DB
// route GET /api/posts/
// @accesss Private
// @returns {object} 200 - Returns an object that returns a single or all the posts
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const getPost = async (req, res) => {

    try {
        const posts = await Post.find(req.query.postId ? { '_id': req.query.postId } : {});
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc This API Deletes a Post from DB
// route DELETE /api/posts/
// @accesss Private
// @returns {object} 200 - Returns an object that returns a message "Post was deleted"
// @returns {object} 403 - Returns an object that returns a message "Forbidden"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const deletePost = async (req, res) => {

    if (req.query.userId !== req.user._id.toString())
        return res.status(403).send({ message: "Forbidden" });

    try {
        await Post.deleteOne({ '_id': req.query.postId });
        await Comment.deleteMany({ 'postId': req.query.postId });
        res.status(200).send({ message: "Post was deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};


export { createPost, getPost, deletePost };