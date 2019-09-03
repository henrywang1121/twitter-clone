require('dotenv').load();
const jwt = require('jsonwebtoken');

//Authentication - Ensure the user is logged in
exports.loginRequire = function(req, res, next){
    try {
        const token = req.headers.authorization.split('')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Please log in first'
                });
            }
        });
    } catch(err){
        return next({
            status: 401,
            message: 'Please log in first'
        });
    }
}

//Authorization Ensure we have the right user
exports.loginRequire = function(req, res, next){
    
}