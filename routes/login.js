const router = require('express').Router();
const regUser = require('../models/regUser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticate = require('../autheticate');
//const jwt = require('jsonwebtoken');


passport.use(new LocalStrategy(regUser.authenticate()));
passport.serializeUser(regUser.serializeUser());
passport.deserializeUser(regUser.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());

router.post('/',passport.authenticate('local'),(req,res,next)=> {
    if(req.user) {
        let payload = { _id: req.user._id }
        let token = authenticate.getToken(payload)
        res.status(200)
        res.setHeader('Content-type','application/json')
        //res.send(JSON.stringify({errCode: 0, message:`Welcome ${req.user.username}!`}))
        res.send({token})
    }
});


module.exports = router;
