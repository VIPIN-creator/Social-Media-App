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
    const user = new User(req.body);

    user.findUser((err, result) => {
        console.log("result is ", result);
        if(err) {
            console.log(err);
            res.status(406).send('Error');
        }
        else{
           if(result){
               res.status(201).send('Successful');
           }
           else res.status(406).send('Error');
        }

    })
        

}


