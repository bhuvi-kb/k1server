const express=require('express');
const router = express.Router();
const regUser = require('../models/regUser');
const userProfile=require('../models/userProfile');


router.post('/', (req, res, next)=>{
    console.log(req.body);
    regUser.findOne({ $or:[{email: req.body.email}, {username: req.body.username}]}, (err, user)=> {
        if(err) {
           
            res.setHeader('Content-type','application/json')
            res.send(JSON.stringify({errCode: 100, message:"Error occured while registering"}))
        }
        else if(user) {
            res.setHeader('Content-type','application/json')
            res.send(JSON.stringify({errCode: 101, message:"This username or email already exists"}))
        }
        else {
            regUser.register({username: req.body.username, email: req.body.email}, req.body.password, (err, user)=> {
                if(err) { 
                   
                    res.setHeader('Content-type','application/json')
                    res.send(JSON.stringify({errCode: 103, message:"Error occured while registering"}))
                }
                else {
                    console.log("creating profile...!")
                    userProfile.create({userid: user._id, username: user.username})
                    .then((usr)=> {
                        console.log(usr);
                    })
                    .catch((err)=> {console.log(err)});

                    res.setHeader('Content-type','application/json')
                    res.send(JSON.stringify({errCode: 0, message:"Registration successful"}))
                }
            })
        }
    })
});


module.exports = router;
