const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
userid: {
    type: mongoose.Types.ObjectId,
    required: true
},
username : {
    type: String,
    required: true
},
firstname: {
    type: String,
    default:''
    //required: true
},
lastname: {
    type: String,
    default:''
},
numfollowers: {
    type:Number,
    default: 0
},
followers:{
    type: [mongoose.Types.ObjectId]
},
numfollowing: {
    type:Number,
    default: 0
},
following:{
    type: [mongoose.Types.ObjectId]
},
avatarurl: {
    type: String
}
},
 {timestamps: true});


const userProfile = mongoose.model('userProfile', userProfileSchema);

module.exports = userProfile;

