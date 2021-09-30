const express  = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/User');


const {RegisterUser, LoginUser, LogoutUser, SearchUser} = require('./controllers/userController');
const {CreatePost} = require('./controllers/postController');

// always check the user for any route request
router.get('*', (req, res, next) => {
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

                // const address = String(user.email).trim().toLowerCase();
                // // Create an MD5 hash of the final string
                // const hash = md5( address );
                // res.locals.gravatar = `https://www.gravatar.com/avatar/${ hash }`;
                
                console.log('locals ', res.locals.user);
                console.log('token checked at * ');
                next();
            }
        });
    } 
    else{
        console.log('No token found');
        res.locals.user = null;
        res.render('home-guest');
    }
});

router.get('/', (req, res) => {
        res.redirect('/dashboard');
});

router.post('/login', LoginUser);

router.post('/register', RegisterUser);

router.get('/logout',LogoutUser);

router.get('/dashboard', (req, res) => {   
    res.render('home-dashboard');
});

router.get('/create_post', (req, res) => {
    res
        .status(200)
        .render('create-post.ejs');
});

router.post('/create_post', CreatePost);

router.post('/user', SearchUser);

router.get('/user', (req, res) => {
   res 
        .status(200)
        .render('user.ejs');
});

module.exports = router;