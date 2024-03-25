import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protect = async (req, res, next) => {

    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
            next();
        } catch (error) {
            res.status(401).send({ message: "Not authorized, invalid token" });
        }
    } else
        res.status(401).send({ message: "Not authorized, no token" });
};


export default protect;