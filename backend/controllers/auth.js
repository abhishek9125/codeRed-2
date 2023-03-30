const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

const { sendError } = require('../utils/helper');
const { generateOTP, generateMailTransporter } = require('../utils/mail');

const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return sendError(res, 'This email is already present in Database');
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    let OTP = generateOTP(6);

    const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP });

    await newEmailVerificationToken.save();

    var transport = generateMailTransporter();

    transport.sendMail({
        from: "verification@codered.com",
        to: newUser.email,
        subject: "Email Verification",
        html: `
        <p>You verification OTP</p>
        <h1>${OTP}</h1>
      `,
    });

    return res.status(201).json({
        message: "Please verify your email. OTP has been sent to your email account.",
        user: {
            id: newUser._id,
            name,
            email
        }
    });
}

exports.verifyEmail = async (req, res) => {

    const { userId, OTP } = req.body;

    if(!isValidObjectId(userId)) {
        return sendError(res, 'Invalid User');
    }

    const user = await User.findById(userId);

    if(!user) {
        return sendError(res, 'User Not Found', 404);
    }

    if(user.isVerified) {
        return sendError(res, 'User is already Verified..!!');
    }

    const token = await EmailVerificationToken.findOne({ owner: userId });

    if(!token) {
        return sendError(res, 'Token Not Found');
    }

    const isTokenValid = token.compareToken(OTP);

    if(!isTokenValid) {
        return sendError(res, 'OTP is Invalid');
    }

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    var transport = generateMailTransporter();

    transport.sendMail({
        from: 'verification@codered.com',
        to: user.email,
        subject: 'Welcome Email',
        html: `
            <h1> Welcome to Our Coding Platform </h1>
        `
    });

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            token: jwtToken,
            role: user.role,
            isVerified: user.isVerified
        },
        message: 'Your Email is Verified'
    });

}