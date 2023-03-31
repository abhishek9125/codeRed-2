const express = require('express');
const { register, verifyEmail, resendEmailVerificationToken, forgetPassword, verifyPasswordResetToken, signIn, resetPassword, isAuthVerification } = require('../controllers/auth');
const { isAuth, isValidPasswordResetToken } = require('../middlewares/auth');
const { userValidator, validate, validatePassword, signInValidator } = require('../middlewares/validator');

const router = express.Router();

router.get('/is-auth', isAuth, isAuthVerification);
router.post('/register', userValidator, validate, register);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-password-reset-token', isValidPasswordResetToken, verifyPasswordResetToken);
router.post('/reset-password', validatePassword, validate, isValidPasswordResetToken, resetPassword);

module.exports = router;