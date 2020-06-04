const express = require('express');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const mongoUrl = 'mongodb://localhost:27017/keechdb';
const connection = mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

connection.then((db)=>{
    console.log("connected to db")
})
.catch((err)=> { "unable to connect to DB"})


var app = express();
app.use(cors());
app.use(bodyParser.json());





app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.listen(3000);