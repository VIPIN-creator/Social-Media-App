const User = require('../models/User');

const jwt = require('jsonwebtoken');

// create json web token
const maxAge =  3* 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id : id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn : maxAge
    });
};

exports.RegisterUser = async (req, res) => {

    console.log('registering user data ', req.body);

    try {
        const user = new User(req.body);

        const oldUser = await User.findOne({ $or : [{'username' : user.username}, {'email' : user.email}  ] });

        if(oldUser){
            return res.status(406).send('User already exist');
        }
        
        let newUser = await user.save();

        if(newUser){
            
            const token = createToken(newUser._id);
            res
                .status(200)
                .cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 })
                .json({success : true});

            console.log('new user added');
          
        }
        else throw 'error new user not found';
    } 
    catch (error) {
        if(error)console.log('error in backend registering user', error);
        res.status(406).send(error);
    }
        
}


exports.LoginUser = async(req, res) => {

    console.log('logging user data ', req.body);

    try {

        const user = new User(req.body);
         const newUser = await user.findUser(req.body.username, req.body.password);

        const token = createToken(newUser._id);
        res
            .status(200)
            .cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 })
            .json({success : true});

        console.log('user logged in');

        
        
    } catch (error) {
        res.status(406).send(error);
    }
    
}

exports.LogoutUser = (req, res) => {
    res
        .status(200)
        .cookie('jwt', '', {maxAge: 1})
        .json({success : true})
        .redirect('/');
}


