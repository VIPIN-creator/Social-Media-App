const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : ['true', 'Username must not be empty'],
        unique : true ,
        dropDups : true,
        minLength : [3, "Minimum length of username must be 3"],
        maxLength : [8,  "Maximum length of username must be 8"],
    },

    password :{ 
      type : String,
      required : ['true', 'Password must not be empty']
    }, 

    email : {
        type : String, 
        required : ['true', 'Email must not be empty' ],
        unique : true,
        dropDups: true,
        lowercase : true,
        validate : [validator.isEmail, 'Please enter a correct email']
    },

    posts : Array
});

// // Instance methods
// UserSchema.methods.findByEmail = function(cb){
//     return mongoose.model('User').find({ email: this.email }, cb);
// };

// UserSchema.methods.findByUsername = function(cb){
//     return mongoose.model('User').find({ username: this.username }, cb);
// };

UserSchema.pre('save', async function(){
        const hash = await bcrypt.hash(this.password, 12); 
        this.password = hash;   
});

UserSchema.methods.findUser = async function(username, password){

    try {

      const user = await mongoose.model('User').findOne({username : username});

      if(user){
        const found = await bcrypt.compare(password, user.password);

        if(found) return user;
        else throw 'Wrong password';

      }
      else throw 'User not exists';

    } catch (error) {
        throw error;
    }
  
  }


const User = mongoose.model('User', UserSchema); 


module.exports = User;