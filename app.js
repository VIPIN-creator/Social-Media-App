const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const routes = require('./router');

//  initiate dotenv and make your environment variables available throughout your application
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// connect to db
mongoose.connect(`${process.env.DATABASEURL}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(e => console.log(e))




// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// to parse JSON bodies
app.use(express.json());

app.use(routes);

