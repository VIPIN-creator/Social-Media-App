const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : ['true', 'username must not be empty'],
        unique : true 
    },

    password : String, 

    email : {
        type : String, 
        required : "true",
    },

    photo : String
});

// Instance methods
UserSchema.methods.findByEmail = function(cb){
    return mongoose.model('User').find({ email: this.email }, cb);
};

UserSchema.methods.findByUsername = function(cb){
    return mongoose.model('User').find({ username: this.username }, cb);
};


const User = mongoose.model('User', UserSchema); 



module.exports = User;