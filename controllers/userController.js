const User = require('../models/User');



exports.RegisterUser = async (req, res) => {
    const user = new User(req.body);

    user.findByEmail((err, users) => {
        if(err) console.log(err);
        else{
            if(users) console.log("we found someone same", users);
            else console.log(" we found none ", users);
        }
    });    
    
    user.save()
        .then(d => {
            console.log(d);
            res.send('successful')
        })
        .catch(e => {
            console.log("oops found an error", e);
            res.send('there is error')
        })

}


