const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var cors = require('cors')       //////////  used for Cross-Origin Resource Sharing of data
require('dotenv').config()       ////////// used for accesing files in .env file               




const port = process.env.PORT || 6000;

const mongo_url = process.env.MONGODB_URI;




app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

///////////user route

const userRoutes = require('./server1/routes/userRoutes');
app.use('/v1/api', userRoutes);


/////////// database connection 
mongoose.connect(mongo_url,
    {userNewUrlParser: true ,
    useFindAndModify: false},
    () =>  console.log('Connected to DB!')
);

/////////// post listner

app.listen(port);
