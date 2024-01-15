import Post from '../models/postModel.js';
import Vote from '../models/voteModel.js';


// @desc This API Creates a Vote and updates the Vote in DB
// route POST /api/posts/vote/
// @accesss Private
// @returns {object} 201 - Returns an object that returns a message "Vote was created"
// @returns {object} 202 - Returns an object that returns a message "Vote was received upvote/downvote"
// @returns {object} 202 - Returns an object that returns a message "Vote was received unvote"
// @returns {object} 401 - Returns an object that returns a message "unauthorized"
// @returns {object} 404 - Returns an object that returns a message "Post was not found"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const postVote = async (req, res) => {

    const { postId, userId, voteOption } = req.body;

    if (userId !== req.user._id.toString())
        return res.status(401).send({ message: 'unauthorized' });

    try {
        const post = await Post.findOne({ '_id': postId });

        if (!post)
            return res.status(404).send({ message: 'Post was not found' });

        const voteExists = await Vote.findOne({ postId });

        if (voteExists) {

            if (voteOption === 'upvote') {

                const userIndex = voteExists.userId.map(e => e.userId).indexOf(userId);

                if (!await Vote.findOne({ postId, userId: { $elemMatch: { userId } } })) {
                    voteExists.userId.push({ userId, voteOption: 'upvote' });
                    voteExists.votesCount++;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received upvote' });
                } else if (voteExists.userId[userIndex].voteOption === 'downvote') {
                    voteExists.userId[userIndex] = { userId, voteOption: 'upvote' };
                    voteExists.votesCount = voteExists.votesCount + 2;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received upvote' });
                } else if (voteExists.userId[userIndex].voteOption === 'upvote') {
                    voteExists.userId[userIndex] = { userId, voteOption: 'unvote' };
                    voteExists.votesCount--;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received unvote' });
                } else {
                    voteExists.userId[userIndex] = { userId, voteOption: 'upvote' };
                    voteExists.votesCount++;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received upvote' });
                };
            } else if (voteOption === 'downvote') {

                const userIndex = voteExists.userId.map(e => e.userId).indexOf(userId);

                if (!await Vote.findOne({ postId, userId: { $elemMatch: { userId } } })) {
                    voteExists.userId.push({ userId, voteOption: 'downvote' });
                    voteExists.votesCount--;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received downvote' });
                } else if (voteExists.userId[userIndex].voteOption === 'upvote') {
                    voteExists.userId[userIndex] = { userId, voteOption: 'downvote' };
                    voteExists.votesCount = voteExists.votesCount - 2;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received downvote' });
                } else if (voteExists.userId[userIndex].voteOption === 'downvote') {
                    voteExists.userId[userIndex] = { userId, voteOption: 'unvote' };
                    voteExists.votesCount++;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received unvote' });
                } else {
                    voteExists.userId[userIndex] = { userId, voteOption: 'downvote' };
                    voteExists.votesCount--;
                    await voteExists.save();
                    res.status(202).send({ message: 'Vote was received downvote' });
                };
            };
        } else {

            await Vote.create({
                postId,
                userId: [{ userId, voteOption }],
                votesCount: voteOption === 'upvote' ? 1 : -1
            });
            res.status(201).send({ message: "Vote was created" });
        };
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc This API Gets all Votes from DB
// route POST /api/posts/vote/
// @accesss Private
// @returns {object} 200 - Returns an object that returns a JSON with all the votes 
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const getVotes = async (req, res) => {

    const postId = req.query.postId;

    try {
        const vote = await Vote.findOne({ postId });
        res.status(200).json({ vote })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


export { postVote, getVotes };