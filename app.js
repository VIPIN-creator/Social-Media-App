const express = require('express');
const path = require('path');

const app = express();

//  initiate dotenv and make your environment variables available throughout your application
const dotnev = require('dotenv');
dotnev.config();
const PORT = process.env.PORT || 4000;

const db = require('./db');

// connect to db
db.connect(`${DATABASEURL}`, function(err){
    if(err){
        console.log('Unable to connect');
        process.exit(1);
    }
    else{
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`) );
    }
})

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)  => {res.render('home-guest')});

