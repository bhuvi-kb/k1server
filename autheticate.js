const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const regUser = require('./models/regUser');
const crypto = require('crypto');


crypto.randomBytes(32, (err, buf)=>{
    var token = buf.toString('hex');
    console.log(token)
});

const secretKey = 'ce6488f37e7ad7df3ac5cd7969309187b38f2eeae28b79c724d1a279d4d5dd2c';


exports.getToken = function(user) {
    //console.log("insde jwt function")
    return jwt.sign(user, secretKey, {expiresIn: 3600})
};

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    console.log(jwt_payload);
    regUser.findOne({_id: jwt_payload._id}, (err,user)=>{
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })

}));

exports.verifyUser = passport.authenticate('jwt', {session: false});