const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try {
        //find a user
        let user = await db.User.findOne({
            email: req.body.email
        });

        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        //verify password
        //login if password is verified
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid email/password'
            })
        }

    } catch(err){
        return next({
            status: 400,
            message: 'Invalid email/password'
        })
    }
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