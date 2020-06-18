const express = require('express');
const router = express.Router();
const userProfile = require('../models/userProfile');
const authenticate = require('../autheticate');

// router.get('/', authenticate.verifyUser, (req,res,next)=>{
//     userProfile.findOne({userid: req.user._id}, (err, user)=>{
//         if(user) {
//             console.log(user)
//             res.send(user)
//         }
//         else{
//             console.log("user not found")
//             res.send({})
//         }
//     })
// });

router.post('/', authenticate.verifyUser, (req, res, next) => {

    console.log(req.body);
    console.log("updating user...!")

    userProfile.findOne({ userid: req.user._id }, (err, existingUser) => {
        if (err) {
            console.log("Some error happened");
            return err;
        }
        else if (existingUser) {
            console.log("User already exists");
            console.log(existingUser);

            userProfile.updateOne(
                { userid: req.user._id },
                { $set: { username: req.user.username, firstname: req.body.firstname, lastname: req.body.lastname } })
                .then((updatedUser) => {
                    res.send(updatedUser)
                })
                .catch((err) => res.send(err))

        }
        else {
            userProfile.create({ userid: req.user._id, username: req.user.username, firstname: req.body.firstname, lastname: req.body.lastname })
                .then((usr) => {
                    console.log(usr);
                    res.send(usr);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });

            //res.send(req.body);

        }

    });

});

router.post('/addfollowing', authenticate.verifyUser, (req, res, next) => {
    console.log("Adding following for user", req.user._id, " and followers of ", req.body.following)


    let followingUser = req.user._id.toString();//converted so that duplicates are not added to followers in second update
    let followedUser = req.body.following;

    userProfile.findOne({ userid: followingUser })
        .then((usr) => {
            if (usr.following.find(elem => elem == followedUser)) {
                console.log(followedUser, " Already in ", usr.following)
            }
            else {
                console.log("num folloing n followers resp are, ",usr.numfollowing," ", usr.numfollowers);

                usr.updateOne({ $inc:{numfollowing:1},
                    $push: { following: followedUser } 
                    })
                    .then((updatedUsr) => {
                        console.log(updatedUsr);
                    })
                    .catch((err) => next(err))
            }
        });

    userProfile.findOne({ userid: followedUser })
        .then((usr) => {
            if (usr.followers.find(elem => elem == followingUser)) {
                console.log("Already in followers list")
            }
            else {
                usr.updateOne({ $inc:{numfollowers:1}, $push: { followers: followingUser } })
                    .then((usr) => {
                        console.log(usr)
                    })
                    .catch((err) => next(err));
            }
        })
        .catch((err) => console.log(err));


    res.send({status: "success"});

})
;


router.post('/unfollow', authenticate.verifyUser, (req, res, next) => {
    console.log("Removing following for user", req.user._id, " and followers of ", req.body.unfollowed)


    let reqUser = req.user._id.toString();//converted so that duplicates are not added to followers in second update
    let unfollowedUser = req.body.unfollowed;

    userProfile.findOne({ userid: reqUser })
        .then((usr) => {
            if (usr.following.find(elem => elem == unfollowedUser)) {
                console.log(unfollowedUser, " Already in ", usr.following);

                console.log("num folloing n followers resp are, ",usr.numfollowing," ", usr.numfollowers);

                usr.updateOne({ $inc:{numfollowing:-1},
                    $pull: { following: unfollowedUser } 
                    })
                    .then((updatedUsr) => {
                        console.log(updatedUsr);
                    })
                    .catch((err) => next(err))

            }
            else {
                console.log("not in followed list")
            }
        });

    userProfile.findOne({ userid: unfollowedUser })
        .then((usr) => {
            if (usr.followers.find(elem => elem == reqUser)) {
                console.log("Already in followers list");
                usr.updateOne({ $inc:{numfollowers:-1}, $pull: { followers: reqUser } })
                .then((usr) => {
                    console.log(usr)
                })
                .catch((err) => next(err));
            }
            else {
                console.log("not in unfollowed user's followers list")
            }
        })
        .catch((err) => console.log(err));




    res.send({status: "success"});

})



module.exports = router;

