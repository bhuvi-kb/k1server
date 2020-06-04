const express=require('express');
const router = express.Router();
const authenticate = require('../autheticate');




router.get('/', authenticate.verifyUser,(req,res,next)=>{
    //console.log("in home")
    res.end('welcome')
});


module.exports = router;
