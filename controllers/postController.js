const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    let errors = {title : '', description : ''};

    if(err.message && err.message.includes('Post validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }

    if(err){ return err};
}


exports.CreatePost = async(req, res) => {
  console.log('received data is ', req.body);
    const token = req.cookies.jwt;

    if(token){

        try {
            
            const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);    
           
            if(user.id){
                const {title, description} = req.body;
                const post = new Post({title, description, date : new Date(), user : user.id });

                const newPost = await post.save();

                await User.findOneAndUpdate({_id : user.id}, {$push : {posts : newPost._id}} );

            //    if(foundUser){
            //        console.log('post is added to user');
            //    }
               
                   
                res
                    .status(200)
                    .json({success : true});

                        
            }
            else{
                res.locals.user = null;
                res.locals.gravatar = null;

                res.render('home-guest');
            }

        } catch (error) {
            console.log("post can't be created", error);
            const errors = handleErrors(error);
            res.status(400).json({errors});
        }

    }
    else{
        console.log('please login to create a post');
        res.send(401);
    }
  
}