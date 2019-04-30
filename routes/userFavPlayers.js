var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    Player = require('../models/PlayerSchema.js'),
    router = express.Router();


/**
 * Get the favortied player of a user
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
                data: user.fav_players
            });
        });
});

/**
 * Add a favorited player to the user's fav players array
 */
router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    const player_id = req.body.player_id;

    Player.findOne({ "player_id": player_id }, (err, item) => {
        item.followers += 1;
        item.save();
        let player = {
            player_id: item.toObject().player_id,
            img_url: item.toObject().img_url,
            name: item.toObject().name
        }
        User.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(user_id) },
            { "$push": { "fav_players": player } },
            { new: true },
            (err, user) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send({
                    data: user
                });
            });
    });
});

router.delete('/', (req, res) => {
    const user_id = req.query.user_id;
    const player_id = req.query.player_id;
    Player.findOne({ "player_id": player_id }, (err, player) => {
        player.followers -= 1;
        player.save();
    });

    User.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(user_id) },
        { "$pull": { "fav_players": { "player_id": player_id } } },
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