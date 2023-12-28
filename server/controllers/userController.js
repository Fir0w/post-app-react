import User from '../models/userModel.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validateInput.js';
import generateToken from '../utils/generateToken.js';


// @desc Auth user/set token
// route POST /api/users/auth
// @accesss Public
const authUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(202).json({
            message: "User Authenticated",
            userId: user._id,
            username: user.username
        });
    } else
        res.status(401).send({ message: "Invalid email or password" });
};

// @desc Register new user
// route POST /api/users
// @accesss Public
const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(500).send({ message: "User already exists" });
    };

    if (!validateUsername(username) && !validateEmail(email) && !validatePassword(password))
        return res.status(400).send({ message: "Invalid user data" });

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        // generateToken(res, user._id);

        if (user) {
            res.status(201).send({ message: "User created" });
        } else
            res.status(400).send({ message: "Invalid user data" });

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "something went wrong" });
    };
};

// @desc Logout user
// route POST /api/users/logout
// @accesss Public
const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).send({ message: "User logged out" });
};


export { authUser, registerUser, logoutUser };