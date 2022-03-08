const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User, Role, Permission} = require('../models');
const md5 =require('md5');


async function verifyUser(username, password, done){

    const user = await User.findOne( {
        where: {
            email: username,
            password: md5(password)
        }
    });

    if (!user) {
        return done(null, false, {message: 'Incorrect email or password'});
    }

    return done(false, {
        id: user.id,
    });
}