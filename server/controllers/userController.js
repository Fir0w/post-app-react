import User from '../models/userModel.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validateInput.js';
import generateToken from '../utils/generateToken.js';


// @desc Auth user/set token
// route POST /api/users/auth
// @accesss Public
// @returns {object} 202 - Returns an object that returns a JSON with user info
// @returns {object} 401 - Returns an object that returns a message "Invalid email or password"
const authUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(202).json({
            message: "User Authenticated",
            userId: user._id,
            username: user.username,
            profileAvatar: user.profileAvatar
        });
    } else
        res.status(401).send({ message: "Invalid email or password" });
};

// @desc Register new user
// route POST /api/users
// @accesss Public
// @returns {object} 201 - Returns an object that returns a message "User created"
// @returns {object} 400 - Returns an object that returns a message "User already exists"
// @returns {object} 400 - Returns an object that returns a message "Invalid user data"
// @returns {object} 400 - Returns an object that returns a message "something went wrong"
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).send({ message: "User already exists" });
    };

    if (!(validateUsername(username) && validateEmail(email) && validatePassword(password)))
        return res.status(400).send({ message: "Invalid user data" });

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            res.status(201).send({ message: "User created" });
        } else
            res.status(400).send({ message: "something went wrong" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};

// @desc Logout user
// route POST /api/users/logout
// @accesss Public
// @returns {object} 200 - Returns an object that returns a message "User logged out"
const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).send({ message: "User logged out" });
};

// @desc Update user avatar
// route Put /api/users/avatar
// @accesss Private
// @returns {object} 202 - Returns an object that returns a JSON with profileAvatar Index
const updateAvatar = async (req, res) => {

    const { index } = req.body;
    const user = await User.findOneAndUpdate(req.user._id, { profileAvatar: index }, { new: true });
    res.status(202).json({
        profileAvatar: user.profileAvatar
    });
};

// @desc Get user profile
// route GET /api/users/user
// @accesss Public
// @returns {object} 202 - Returns an object that returns a JSON with profileAvatar Index and username
// @returns {object} 500 - Returns an object that returns a message "Internal Server Error"
const getUser = async (req, res) => {

    const { username } = req.query;
    try {
        const user = await User.findOne({ username });
        res.status(202).json({
            profileAvatar: user?.profileAvatar,
            username
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    };
};


export { authUser, registerUser, logoutUser, updateAvatar, getUser };