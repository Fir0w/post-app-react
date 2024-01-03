import Post from '../models/postModel.js';
import Vote from '../models/voteModel.js';


const votePost = async (req, res) => {

    const { postId, userId, voteOption } = req.body;

    if (userId !== req.user._id.toString())
        return res.status(500).send({ message: "something went wrong" });

    try {
        const post = await Post.findOne({ '_id': postId });

        if (!post)
            return res.status(404).send({ message: "Post was not found" });

        const voteExists = await Vote.findOne({ postId });

        if (voteExists) {

            if (voteOption === 'upvote') {

                if (!await Vote.findOne({ postId, userId: { $elemMatch: { userId } } })) {

                    voteExists.userId.push({ userId, voteOption: 'upvote' });
                    voteExists.votesCount++;
                    await voteExists.save();
                }

                const test = voteExists.userId.map(e => e.userId);
                let result = 10;
                for (let index = 0; index < voteExists.userId.length; index++) {
                    const element = test[index];
                    if (element === userId) {
                        result = index;
                    }
                }
                if (voteExists.userId[result].voteOption === 'downvote') {
                    voteExists.userId[result] = { userId, voteOption: 'upvote' };
                    voteExists.votesCount++;
                }

                else return res.status(200).send({ message: "Vote was received upvote" });
                await voteExists.save();

            } else if (voteOption === 'downvote') {

                if (!await Vote.findOne({ postId, userId: { $elemMatch: { userId } } })) {

                    voteExists.userId.push({ userId, voteOption: 'downvote' });
                    voteExists.votesCount--;
                    await voteExists.save();
                }

                const test = voteExists.userId.map(e => e.userId);
                let result = 10;
                for (let index = 0; index < voteExists.userId.length; index++) {
                    const element = test[index];
                    if (element === userId) {
                        result = index
                    }
                }
                if (voteExists.userId[result].voteOption === 'upvote') {
                    voteExists.userId[result] = { userId, voteOption: 'downvote' };
                    voteExists.votesCount--;
                }

                else return res.status(200).send({ message: "Vote was received downvote" });
                await voteExists.save();
            };

        } else {

            await Vote.create({
                postId,
                userId: [{ userId, voteOption }],
                votesCount: voteOption === 'upvote' ? 1 : -1
            });
            console.log("vote created");
        };
        res.status(200).send({ message: "Vote was received" });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};

const getVotes = async (req, res) => {

    const postId = req.query.postId;

    try {
        const vote = await Vote.findOne({ postId });
        res.status(200).json({ vote })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
};


export { votePost, getVotes };