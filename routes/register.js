const express=require('express');
const router = express.Router();
const regUser = require('../models/regUser');


router.post('/', (req, res, next)=>{
    console.log(req.body);
    regUser.findOne({username: req.body.username}, (err, user)=> {
        if(err) {
           
            res.setHeader('Content-type','application/json')
            res.send(JSON.stringify({errCode: 100, message:"Error occured while registering"}))
        }
        else if(user) {
            res.setHeader('Content-type','application/json')
            res.send(JSON.stringify({errCode: 101, message:"already exists"}))
        }
        else {
            regUser.register({username: req.body.username}, req.body.password, (err, user)=> {
                if(err) { 
                   
                    res.setHeader('Content-type','application/json')
                    res.send(JSON.stringify({errCode: 103, message:"Error occured while registering"}))
                }
                else {
                   
                    res.setHeader('Content-type','application/json')
                    res.send(JSON.stringify({errCode: 0, message:"Registration successful"}))
                }
            })
        }
    })
});


module.exports = router;
