const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },

    password : String, 

    email : {
        type : String, 
        unique : true, 
        required : "true"
    },

    photo : String
});

const User = mongoose.model('User', UserSchema); 

module.exports = User;