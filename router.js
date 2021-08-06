const express  = require('express');
const router = express.Router();

const {RegisterUser} = require('./controllers/userController');

router.get('/', (req, res) => {
    res.render('home-guest');
});

router.post('/login', (req, res) => {
   console.log(req.body);
    res.send('login request');
});

router.post('/register', RegisterUser);

module.exports = router;