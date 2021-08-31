const express  = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const {RegisterUser, LoginUser, LogoutUser} = require('./controllers/userController');

// always check the user for any route request
router.all('*', (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decodedToken) => {
            if(err){
                res.locals.user = null;
                res.render('home-guest');
            } 
            else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } 
    else{
        res.locals.user = null;
        res.render('home-guest');
    }
});

router.get('/', (req, res) => {
        res.render('home-dashboard');
   
});

router.post('/login', LoginUser);

router.post('/register', RegisterUser);

router.get('/logout',LogoutUser);

module.exports = router;