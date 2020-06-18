const express = require('express');
const router = express.Router();
const autheticate = require('../autheticate');
const multer = require('multer');
const fs=require('fs');
const path = require('path');
const userProfile = require('../models/userProfile');


var storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        console.log(req.user._id);
        let subfolder = req.user._id;
        let dir = "profile_images/"+subfolder;
        fs.exists(dir, exist => {
            if(!exist) {
                fs.mkdir(dir, error => cb(error, dir))
            }
            else {
                cb(null, dir)
            }
        });
        
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar.png')
    }
})

const upload = multer({storage: storage});

router.post('/',autheticate.verifyUser, upload.single('avatar'), (req,res,next)=>{

    let file = req.file;
    //console.log(req.file.filename);

    if(!file) {
        res.send("No file sent");
    }
    else {
        let img_path = file.path;
        console.log(img_path);
        userProfile.updateOne({userid:req.user._id},{$set: {avatarurl: img_path}})
        .then((usr)=> {
            console.log(usr)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        res.send(file)
    }

});

module.exports = router;
