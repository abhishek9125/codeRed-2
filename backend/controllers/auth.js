const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { sendError } = require('../utils/helper');
const { generateOTP, generateMailTransporter } = require('../utils/mail');

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
}