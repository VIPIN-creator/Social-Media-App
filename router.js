const express  = require('express');
const router = express.Router();

const {RegisterUser, LoginUser} = require('./controllers/userController');


router.get('/', (req, res) => {
    res.render('home-guest');
});

router.post('/login', LoginUser);

router.post('/register', RegisterUser);

module.exports = router;