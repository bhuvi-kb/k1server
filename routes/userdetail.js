const express = require('express');
const router = express.Router();
const autheticate = require('../autheticate');
const Users = require('../models/regUser');
const userProfile = require('../models/userProfile');
const Keech = require('../models/Keech');



router.get('/',autheticate.verifyUser,(req,res,next)=>{
    userProfile.findOne({userid:req.user._id})
    .then((profile)=> {
        console.log(profile);
        let p = {};
        p.firstname = profile.firstname;
        p.lastname = profile.lastname;
        p.numfollowers = profile.numfollowers;
        p.numfollowing=profile.numfollowing;
        p.username=profile.username;
        p.userid=profile.userid;
        p.avatarurl=profile.avatarurl

        //uname = user.username;
        //console.log(uname);
        if(profile.followers.find(elem=>elem==req.user._id.toString())) {
            console.log("already following");
            p.alreadyFollowing=true;
            res.send(JSON.stringify(p)); 
        }
        else {
            p.alreadyFollowing=false;
            res.send(JSON.stringify(p)); 
        }
           
     })
     .catch((err)=> console.log(err));
});

router.get('/:userid', (req,res,next)=>{
    //let uname='';
    Users.findOne({_id:req.params.userid}, {'username':1})
    .then((user)=> {
        console.log(user);
        //uname = user.username;
        //console.log(uname);
            Keech.find({authorId:user._id}).limit(20)
            .then((keeches)=> {
                console.log(keeches);
                res.send(keeches);
            })
            .catch((err)=> {
                console.log(err)
            })
            
     })
     .catch((err)=> console.log(err));
   
});

router.get('/:userid/followers', (req,res,next)=> {
    userProfile.findOne({userid:req.params.userid})
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
});

router.get('/:userid/following', (req,res,next)=> {
    userProfile.findOne({userid:req.params.userid})
    .then((user)=>{
        console.log('user already following ', user.following);
        let f = user.following;
             
        console.log(f);
        userProfile.find({userid:{$in: f}}, 'userid username firstname lastname avatarurl')
        .then((allfollowing)=> {
            console.log(allfollowing);
            res.setHeader('Content-type', 'application/json');
            res.send(allfollowing);
        })
    })
});


router.get('/:userid/profile', autheticate.verifyUser,(req,res,next)=>{
    //let uname='';
    
    userProfile.findOne({userid:req.params.userid})
    .then((profile)=> {
        console.log(profile);
        let p = {};
        p.firstname = profile.firstname;
        p.lastname = profile.lastname;
        p.numfollowers = profile.followers.length;
        p.numfollowing=profile.following.length;
        p.username=profile.username;
        p.userid=profile.userid;
        p.avatarurl=profile.avatarurl;

        //uname = user.username;
        //console.log(uname);
        if(profile.followers.find(elem=>elem==req.user._id.toString())) {
            console.log("already following");
            p.alreadyFollowing=true;
            res.send(JSON.stringify(p)); 
        }
        else {
            p.alreadyFollowing=false;
            res.send(JSON.stringify(p)); 
        }
          
     })
     .catch((err)=> console.log(err));
   
});





module.exports=router;