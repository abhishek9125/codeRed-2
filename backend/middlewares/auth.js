const jwt = require('jsonwebtoken')
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const User = require('../models/user');
const PasswordResetToken = require("../models/passwordResetToken");

exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;

    if (!token) return sendError(res, "Token not Found..!!");
    const jwtToken = token.split("Bearer ")[1];

    if (!jwtToken) return sendError(res, "Invalid token!");
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decode;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "Unauthorized Access..!!");

    req.user = user;

    next();
};

exports.isAdmin = async (req, res, next) => {

    const { user } = req;

    if (user.role !== 'admin') {
        return sendError(res, 'Unauthorized Access..!!');
    }

    next();
};

exports.isValidPasswordResetToken = async (req, res, next) => {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId)) {
        return sendError(req, 'Invalid Token or UserId', 400);
    }

    const resetToken = await PasswordResetToken.findOne({ owner: userId });

    if (!resetToken) {
        return sendError(req, 'Unauthorized Access, Invalid Token');
    }

    const matched = await resetToken.compareToken(token);

    if (!matched) {
        return sendError(req, 'Unauthorized Access, Invalid Token');
    }

    req.resetToken = resetToken;

    next();
}