const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = function(){

}

exports.signup = async function(req, res, next){
    try {
        //Create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
    
        //Create a token
        //process.env.SECRET_KEY
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            token
        })
    } catch(err){
        //if a validation fails
        if(err.code === 11000){
            err.message = 'Sorry, username/email is taken!';
        }
        return next({
            status: 400,
            message: err.message
        })

    }
}