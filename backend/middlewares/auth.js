const jwt = require('jsonwebtoken')
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();

        }

    } catch (error) {
        console.log("Error Validating the Token : ", error);
        res.status(401).json({
            error: 'Token is either Invalid or Expired.'
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const adminUser = await User.findById(decoded.id).select('-password');

            if(adminUser.role !== 'admin') {
                res.status(403).json({
                    error : 'Admin Resouce. Access Denied'
                });
            } else {
                next();
            }
        }

    } catch (error) {
        console.log("Error Validating the Token : ", error);
        res.status(401).json({
            error: 'Token is either Invalid or Expired.'
        })
    }
}
