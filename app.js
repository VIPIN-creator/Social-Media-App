const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)  => {res.render('home-guest')});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`) );