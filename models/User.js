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

    password : String, 

    email : {
        type : String, 
        required : ['true', 'Password must not be empty' ],
        unique : true,
        dropDups: true,
        lowercase : true,
        validate : [validator.isEmail, 'Please enter a correct email']
    },

    photo : String
});

// // Instance methods
// UserSchema.methods.findByEmail = function(cb){
//     return mongoose.model('User').find({ email: this.email }, cb);
// };

// UserSchema.methods.findByUsername = function(cb){
//     return mongoose.model('User').find({ username: this.username }, cb);
// };

UserSchema.pre('save', function(next){

    const hash = bcrypt.hashSync(this.password, 12); 
    this.password = hash;
    next();

});


const User = mongoose.model('User', UserSchema); 



module.exports = User;