const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],       
    },

    description : {
        type : String,
        required : [true, 'Body Content is required'],
    },

    date : Date,
    
    user : String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post; 
