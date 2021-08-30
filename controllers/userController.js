const User = require('../models/User');

const jwt = require('jsonwebtoken');

// create json web token
const maxAge = '3d';
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn : maxAge
    });
};

exports.RegisterUser = async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();

        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 });

        res.status(201).send('successful');
    } catch (error) {
        res.status(406).send('Error');
    }
    
  
         
        
}


exports.LoginUser = async(req, res) => {
    const user = new User(req.body);

    user.findUser((err, result) => {
       if(err) {
          res.status(406).send('Wrong Password');
        }
        else{
           if(result){
               res.status(201).send('Successfully logged in');
           }
           else res.status(406).send('User not found');
        }

    })
        

}


