const express=require('express');
const router = express.Router();
const userProfile=require('../models/userProfile');


router.get('/', (req,res,next)=>{
    let searchString = req.query.q;
    console.log(searchString);

    let clause =  [  {$project:{name:{$concat:["$first_name","$last_name"]}}},
    {$match:{name:new RegExp(searchString, 'i')}}                                             
                               
     ]; 

    userProfile.find({
        $or:[
            {"firstname": {$regex:searchString, $options:"i"}},
            {"lastname": {$regex:searchString, $options:"i"}},
            {"username": {$regex:searchString, $options:"i"}}]
        }, 'userid username firstname lastname')
    .then((usr)=>{
        res.json(usr);
    })
    .catch((err)=>{
        res.send(err)
    })

    //res.send({searchString});
});

module.exports=router;
