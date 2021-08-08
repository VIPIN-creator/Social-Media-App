const User = require('../models/User');



exports.RegisterUser = async (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(d => {
            console.log(d);
            res.status(201).send('successful')
        })
        .catch(e => {
            console.log("oops found an error", e);
            res.status(406).send('Error');
        })

}


exports.LoginUser = async(req, res) => {
    const user = req.body;

    User.find(user)
        .then(d => {
            console.log(d);
            res.status(201).send('successful');
        })
        .catch(e => {
            console.log("Login Error", e);
            res.status(406).send('Login Error');
        })

}


