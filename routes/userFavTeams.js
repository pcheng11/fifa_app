var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    Team = require('../models/TeamSchema.js'),
    router = express.Router();

/**
 * Get the favortied Team of a user
 */
router.get('/', (req, res) => {
    const user_id = req.query.user_id;
    User.findOne(
        { "_id": mongoose.Types.ObjectId(user_id) },
        (err, user) => {
            if (err) {
                res.status(500).send(
                    err
                )
            }
            res.status(200).send({
                data: user.fav_teams
            });
        });
});

/**
 * Add a favorited Team to the user's fav Teams array
 */
router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    const team_id = req.body.team_id;
    Team.findOne({ "team_id": team_id }, (err, item) => {
        let team = {
            team_id: item.toObject().team_id,
            img_url: item.toObject().img_url,
            name: item.toObject().name
        }
        User.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(user_id) },
            { "$push": { "fav_teams": team } },
            { new: true },
            (err, user) => {
                if (err) {
                    res.status(500).send(err)
                }
            });
    });
});


router.delete('/', (req, res) => {
    const user_id = req.query.user_id;
    const team_id = req.query.team_id;
    User.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(user_id) },
        { "$pull": { "fav_teams": { "team_id": team_id } } },
        { new: true },
        (err, user) => {
            if (err) {
                res.status(500).send(
                    err
                )
            }
        });
});



module.exports = router;