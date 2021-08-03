const express  = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home-guest');
});

router.post('/login', (req, res) => {
   console.log(req.body);
    res.send('login request');
});

router.post('/register', (req, res) => {
    res.send('register request');
});

module.exports = router;