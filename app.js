const express = require('express');
const path = require('path');

const app = express();
const routes = require('./router');

//  initiate dotenv and make your environment variables available throughout your application
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// connect to db
const db = require('./db');

db.connect(`${process.env.DATABASEURL}`, function(err){
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

// to parse JSON bodies
app.use(express.json());

app.use(routes);

