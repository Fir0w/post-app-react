import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';


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

const getComment = async (req, res) => {

    try {
        const comments = await Comment.find({ 'postId': req.query.postId });
        res.status(200).send(comments);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};

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
        res.status(500).send('Internal Server Error');
    };
};


export { createComment, getComment, deleteComment };