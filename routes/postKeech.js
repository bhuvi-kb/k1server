const express = require('express');
const router = express.Router();
const authenticate = require('../autheticate');
const Keech = require('../models/Keech');
const userProfile = require('../models/userProfile');

router.post('/', authenticate.verifyUser, (req, res, next) => {
    //console.log(req.user);
    //console.log(req.body);

    //find full name
    userProfile.findOne({ userid: req.user._id }, (err, user) => {
        if (user) {
            console.log("found user", user.firstname, user.lastname, user.firstname + user.lastname);
            Keech.create({
                authorId: req.user._id,
                author: req.user.username,
                author_name: user.firstname + ' ' + user.lastname,
                keechBody: req.body.keechBody
            })
                .then((keech) => {
                    res.setHeader('Content-type', 'application/json');
                    res.send(JSON.stringify({
                        _id: keech.id,
                        keechBody: keech.keechBody,
                        authorId: keech.authorId,
                        author: keech.author,
                        author_name: keech.author_name,
                        likes: keech.likes,
                        shares: keech.shares,
                        comments: keech.comments,
                        date: keech.date
                    }))
                })
                .catch((err) => res.send(err))
        }
        else {
            Keech.create({ authorId: req.user._id, author: req.user.username, keechBody: req.body.keechBody })
                .then((keech) => {
                    res.setHeader('Content-type', 'application/json');
                    res.send(JSON.stringify({
                        _id: keech.id,
                        keechBody: keech.keechBody,
                        authorId: keech.authorId,
                        author: keech.author,
                        likes: keech.likes,
                        shares: keech.shares,
                        comments: keech.comments,
                        date: keech.date
                    }))
                })
                .catch((err) => res.send(err))

        }
    }

    )



});

router.get("/", authenticate.verifyUser, (req, res, next) => {
    let allKeeches = [];
    console.log(req.user);


    userProfile.findOne({userid: req.user._id})
    .then((usr)=>{
        let f=[];
        console.log(usr.following);

         f = usr.following;
        f.unshift(req.user._id);
        console.log(f);

        Keech.find({authorId: {$in: f }}, '_id authorId author author_name keechBody date likes shares').then((keech) => {
            console.log(keech); 
            //res.send(keech)
            userProfile.findOne({ userid: keech.authorId }).then((user) => {
                console.log(user);
            })
            res.send(keech)
        })
            .catch((err) => next(err))
    })

})


module.exports = router;