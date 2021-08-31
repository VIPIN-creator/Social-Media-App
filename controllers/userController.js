const User = require('../models/User');

const jwt = require('jsonwebtoken');

// create json web token
const maxAge =  3* 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn : maxAge
    });
};

exports.RegisterUser = async (req, res) => {

    try {
        const user = new User(req.body);

        const oldUser = await User.findOne({ $or : [{'username' : user.username}, {'email' : user.email}  ] });

        if(oldUser){
            res.status(406).send('User already exist');
        }
        
        let newUser = await user.save();

        if(newUser){
            
            const token = createToken(newUser._id);
            res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 });
          
            res.status(201).send('successful');
        }
        else throw 'error';
    } 
    catch (error) {
        res.status(406).send(error);
    }
        
}


exports.LoginUser = async(req, res) => {

    try {

        const user = new User(req.body);
        await user.findUser(req.body.username, req.body.password);

        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 });


        res.status(201).send(user);
        
    } catch (error) {
        res.status(406).send(error);
    }
    
}

exports.LogoutUser = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.render('home-guest');
}


