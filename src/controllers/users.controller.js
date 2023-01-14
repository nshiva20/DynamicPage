const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/db.service');
const secretKey = require("../configs/algo.config");

function generateAuthToken(details) {
    let token;
    try {
        token = jwt.sign(
            { userId: details._id, email: details.email },
            secretKey,
            { expiresIn: "1h" }
        );

    } catch (err) {
        console.error(err);
        const error = new Error("Error! while generating token.");
        return next(error);
    }
    return token;
}

async function get(req, res, next) {
    let userDetails;
    try {

        userDetails = await userService.getById(req.user.email);
        res
            .status(200)
            .json({
                success: true,
                userDetails: userDetails
            })

    } catch (err) {
        console.error(`Error while getting user details`, err.message);
        next(err);
    }

}

async function login(req, res, next) {
    let { email, password } = req.body;

    let existingUser, token;
    try {
        existingUser = await userService.getById(email);

        if (!existingUser) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found !"
                });
        }

        bcrypt.compare(password, existingUser.password, async function (error, isMatch) {
            if (error) {
                throw error;
            } else if (!existingUser || !isMatch) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Incorrect password !"
                    });
            } else {

                token = await generateAuthToken(existingUser);

                res
                    .status(200)
                    .json({
                        success: true,
                        data: {
                            role: existingUser.role,
                            token: token,
                        },
                    });
            }
        })
    } catch (err) {
        console.error(`Error while login`, err.message);
        next(err);
    }

}

async function create(req, res, next) {
    let existingUser, newUser, token;

    try {

        existingUser = await userService.getById(req.body.email);

        if (existingUser) {
            return res
                .status(409)
                .json({
                    success: false,
                    message: "Customer Id Already Exists!"
                });
        }

        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                throw saltError;
            } else {
                bcrypt.hash(req.body.password, salt, function (hashError, hash) {
                    if (hashError) {
                        throw hashError;
                    } else {
                        req.body.password = hash;
                    }
                })
            }
        })

        const queryOP = await userService.add(req.body);

        if (queryOP.acknowledged) {
            newUser = await userService.getById(req.body.email);
        }

        token = await generateAuthToken(newUser);

        res
            .status(201)
            .json({
                success: true,
                message: "Customer profile created!",
                data: {
                    email: newUser.email, token: token
                },
            });

    } catch {
        const error = new Error("Error! Creating User Profile.");
        return next(error);
    }

}

async function resetPassword(req, res, next) {

    try {
        const existingUser = await userService.getById(req.body.email);

        if (!existingUser) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "User not found !"
                });
        }

        bcrypt.genSalt(12, function (saltError, salt) {
            if (saltError) {
                throw saltError;
            } else {
                bcrypt.hash(req.body.password, salt, async function (hashError, hash) {
                    if (hashError) {
                        throw hashError;
                    } else {
                        req.body.password = hash;
                        await userService.updatePassword(req.body.email, req.body.password);
                    }
                })
            }
        })

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (err) {
        console.error(`Error while updating password`, err.message);
        next(err);
    }
}

async function updatePremium(req, res, next) {

    try {

        await userService.updatePremiumDetails(req.user.email, req.body);

        res.status(200).json({
            success: true,
            message: "Premium added successfully"
        });

    } catch (err) {
        console.error(`Error while updating Premium details`, err.message);
        next(err);
    }
}

module.exports = {
    get,
    create,
    resetPassword,
    login,
    updatePremium
};
