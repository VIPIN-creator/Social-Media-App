const User = require('../models/User');

exports.FollowUnfollow = async(req, res) => {
    console.log('user to be followed ', req.body);

    const {action, follower, following} = req.body;

    try {

        if(action == 'Follow'){       
            await User.findByIdAndUpdate(follower, {$push : {following : following} });
            await User.findByIdAndUpdate(following, {$push : {followers : follower} });
            res
                .status(200)
                .json({success : true});
                
        }

        if(action == 'Unfollow'){
            await User.findByIdAndUpdate(follower, {$pull : {following : following} });
            await User.findByIdAndUpdate(following, {$pull : {followers : follower} });
            res
                .status(200)
                .json({success : true});
        }
        

    } catch (error) {
        res.status(400).json({error});
    }

}