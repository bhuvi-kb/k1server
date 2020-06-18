const mongoose = require('mongoose');

const KeechSchema = mongoose.Schema({
    authorId: {
    type: mongoose.Types.ObjectId,
        required: true
    },
    author: {
        type: String,
            required: true
    },
    author_name: {
            type: String
    },
    keechBody: {
        type: String,
        required: true
    },
    likes: {
            type:Number,
            default:0
    },
    likedBy: {
        type: [mongoose.Types.ObjectId]
    },
    shares: {
            type: Number,
            default: 0
    },
    sharedBy: {
        type: [mongoose.Types.ObjectId]
    },
    date: {
        type: Date,
        default: Date.now   // Date.now() did not work! It was giving a different time!
    }
});

const Keech = mongoose.model('Keech', KeechSchema);
module.exports=Keech;
