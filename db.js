const mongoose = require('mongoose');


exports.connect = function(url, done) {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if(err) return done(err)
        done()
    })
}

exports.get = function() {
    return state.db
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        })
    } 
}