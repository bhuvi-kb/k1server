const express = require('express');
const router = express.Router();
const autheticate = require('../autheticate');
const userProfile = require('../models/userProfile');


router.get('/', autheticate.verifyUser,  (req,res,next)=>{

    userProfile.findOne({userid: req.user._id})
    .then((user)=>{
        console.log('user already following ', user.following);
        let f = user.following;
        f.unshift(req.user._id);
        
        userProfile.find({userid:{$nin: f}}, 'userid firstname lastname avatarurl').limit(8)
        .then((suggestions)=> {
            console.log(suggestions);
            res.setHeader('Content-type', 'application/json');
            res.send(suggestions);
        })
    })


})



module.exports=router;