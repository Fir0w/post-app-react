import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';


// @desc This API Creates a Comment in DB
// route POST /api/comments/
// @accesss Private
// @returns {object} 200 - Returns an object that returns a message 
// @returns {object} 400 - Returns an object that returns a message "empty input field"
// @returns {object} 500 - Returns an object that returns a message "something went wrong"
const createComment = async (req, res) => {

    const { message } = req.body;

    if (!message)
        return res.status(400).send({ message: "empty input field" });

    try {
        await Comment.create({
            postId: req.query.postId,
            userId: req.user._id,
            profileName: req.user.username,
            postContent: message
        });
        const post = await Post.findById(req.query.postId);
        post.commentsCount++;
        await post.save();
        res.status(200).send({ message: "Message has been posted" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "something went wrong" });
    };
};

// @desc This API Gets all Comment from DB
// route GET /api/comments/
// @accesss Private
// @returns {object} 200 - Returns an object that returns all the comments of a specific post
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const getComment = async (req, res) => {

    try {
        const comments = await Comment.find({ 'postId': req.query.postId });
        res.status(200).send(comments);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc This API Deletes a Comment from DB
// route DELETE /api/comments/
// @accesss Private
// @returns {object} 200 - Returns an object that returns a message "Post was deleted"
// @returns {object} 500 - Returns an object that returns a message "something went wrong"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const deleteComment = async (req, res) => {

    if ((req.query.postUserId && req.query.userId) !== req.user._id.toString())
        return res.status(500).send({ message: "something went wrong" });

    if (!(await Comment.findOne({ '_id': req.query.commentId })))
        return res.status(500).send({ message: "something went wrong" });

    try {
        await Comment.deleteOne({ '_id': req.query.commentId });
        res.status(200).send({ message: "Post was deleted" });
        const post = await Post.findById(req.query.postId);
        post.commentsCount--;
        await post.save();

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};


export { createComment, getComment, deleteComment };