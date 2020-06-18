const express=require('express');
const router = express.Router();
const authenticate = require('../autheticate');
const userProfile = require('../models/userProfile');

router.get('/', authenticate.verifyUser,(req,res,next)=>{

    userProfile.findOne({userid: req.user._id})
    .then((user)=>{

        console.log('user already following ', user.following);
        
        let f = user.following;
             
        userProfile.find({userid:{$in: f}}, 'userid username firstname lastname avatarurl')
        .then((allfollowing)=> {
            console.log(allfollowing);
            res.setHeader('Content-type', 'application/json');
            res.send(allfollowing);
        })
    })
})


module.exports=router;
