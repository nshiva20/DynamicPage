const jwt = require('jsonwebtoken');
const secretKey = require('../configs/algo.config');
const User = require('../services/db.service');

async function get(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(403).json({ success: false, message: "Error! Token was not provided." });
        }

        const decodedToken = jwt.verify(token, secretKey);

        const user = await User.getById(decodedToken.email);

        if (!user) {
            throw new Error();
        }

        req.user = user;

    } catch (err) {
        return res.status(401).json({
            success: false, message: "Invalid Token"
        });
    }
    return next();
};

module.exports = {
    get
}