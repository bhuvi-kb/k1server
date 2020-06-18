const express=require('express');
const router = express.Router();
const authenticate = require('../autheticate');
const userProfile = require('../models/userProfile');

router.get('/', authenticate.verifyUser,(req,res,next)=>{

    userProfile.findOne({userid: req.user._id})
    .then((user)=>{
        console.log('user already following ', user.followers);
        let f = user.followers;
             
        console.log(f);
        userProfile.find({userid:{$in: f}}, 'userid username firstname lastname avatarurl')
        .then((allfollowers)=> {
            console.log(allfollowers);
            res.setHeader('Content-type', 'application/json');
            res.send(allfollowers);
        })
    })
})


module.exports=router;
