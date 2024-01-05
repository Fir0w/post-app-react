import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';


// @desc This API Creates a Comment in DB
// route POST /api/comments/
// @accesss Private
// @returns {object} 201 - Returns an object that returns a message "Comment has been created"
// @returns {object} 400 - Returns an object that returns a message "empty input field"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
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
        res.status(201).send({ message: "Comment has been created" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc This API Gets all Comments from DB
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
// @returns {object} 403 - Returns an object that returns a message "Forbidden"
// @returns {object} 404 - Returns an object that returns a message "Resource was not found"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const deleteComment = async (req, res) => {

    if ((req.query.postUserId && req.query.userId) !== req.user._id.toString())
        return res.status(403).send({ message: "Forbidden" });

    if (!await Comment.findOne({ '_id': req.query.commentId }))
        return res.status(404).send({ message: "Resource was not found" });

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