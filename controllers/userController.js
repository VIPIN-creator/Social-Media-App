const User = require('../models/User');


const jwt = require('jsonwebtoken');

// create json web token
const maxAge =  3* 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id : id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn : maxAge
    });
};


const handleErrors = (err) => {
    let errors = {email: '', password: '', username: ''};

    if(err.code == 11000){
       if( err.keyPattern.username == 1) errors.username = 'That username is already registered ';
       if( err.keyPattern.email == 1) errors.email = 'That email is already registered ';

       return errors;

    }

    if(err.message && err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }

   
    if(err){ return err};


}

exports.RegisterUser = async (req, res) => {

    console.log('registering user data ', req.body);

    try {
        const user = new User(req.body);

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
        const errors = handleErrors(error);
        res.status(400).json({errors});
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
        if(error)console.log('error in backend logging in user', error);
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
    
}

exports.LogoutUser = (req, res) => {
    res
        .status(200)
        .cookie('jwt', '', {maxAge: 1})
        .json({success : true})
        
}

exports.SearchUser = async(req, res) => {
    const userName = req.body.userName;
    console.log('searched userName is ', userName);

    const token = req.cookies.jwt;

    if(token){
        try {
            const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);    

            if(user.id){

                const found = await User.findOne({username : userName});

                if(found){
                    console.log('found user is, ', found);
                    res.locals.searchedUser = found;

                    res
                        .status(200)
                        .json({success : true});
                }
                else{

                    res
                        .status(200)
                        .json({success : false});
                }

            }else{
                res.locals.user = null;
               
                res.redirect('/');            
            }

        } catch (error) {
                console.log("Can't search the user");
             res.status(400).json();
        }
    }
    else{
        res.status(401).send('please login to search for a user');
    }

    

}


