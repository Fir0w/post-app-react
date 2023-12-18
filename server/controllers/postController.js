import Post from '../models/postModel.js';


const post = async (req, res) => {
    const { message, profileName } = req.body;
    if (!message || !profileName)
        res.status(400).send({ message: "empty input field" });

    try {
        await Post.create({
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
        res.send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
};

export { post, get };