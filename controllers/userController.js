const User = require('../models/User');



exports.RegisterUser = async (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(d => {
            console.log(d);
            res.status(201).send('successful')
        })
        .catch(e => {
           res.status(406).send('Error');
        })

}


exports.LoginUser = async(req, res) => {
    const user = new User(req.body);

    user.findUser((err, result) => {
       if(err) {
          res.status(406).send('User not found');
        }
        else{
           if(result){
               res.status(201).send('Successfully logged in');
           }
           else res.status(406).send('User not found');
        }

    })
        

}


