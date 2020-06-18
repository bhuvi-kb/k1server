const express = require('express');
const path=require('path');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const postKeechRouter = require('./routes/postKeech');
const getSuggestionsRouter = require('./routes/suggestions');
const userDetailRouter = require('./routes/userdetail');
const profileUpdateRouter = require('./routes/profileUpdate');
const profileImagesRouter = require('./routes/profileImage');
const getFollowersRouter = require('./routes/getFollowers');
const getFollowingRouter = require('./routes/getFollowing');
const searchPeopleRouter = require('./routes/searchPeople');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


//const mongoUrl = 'mongodb://localhost:27017/keechdb';
//const mongoUrl='mongodb://root:root@mongo:27017/keechdb';
const mongoUrl='mongodb://root:root@172.21.201.17:27017/keechdb';
const connection = mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

console.log("Trying to connect")
connection.then((db)=>{
    console.log("connected to db")
})
.catch((err)=> { "unable to connect to DB"})


var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile_images',express.static(path.join(__dirname, 'profile_images')));

app.use(bodyParser.json());






app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/postKeech', postKeechRouter);
app.use('/suggestions', getSuggestionsRouter);
app.use('/user', userDetailRouter);
app.use('/updateprofile',profileUpdateRouter);
app.use('/profile_images', profileImagesRouter);
app.use('/followers', getFollowersRouter);
app.use('/following', getFollowingRouter);
app.use('/searchpeople', searchPeopleRouter);
app.listen(3000);
