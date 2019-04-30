var mongoose = require('mongoose'),
    express = require('express'),
    Player = require('../models/PlayerSchema.js'),
    router = express.Router();

var Schema = mongoose.Schema;


/**
 * Handle request such as getting player's info
 */
router.get('/:player_id', (req, res) => {
    const player_id = req.params.player_id;
    Player.findOne({ "player_id": player_id }, (err, item) => {
        res.status(200).send({
            message: "ok",
            data: item
        })
    });
});


/**
 * Put the location of the player only when the user search and click it
 */
router.put('/:player_id', (req, res) => {
    const player_id = req.params.player_id;
    const location = req.body.location
    
    Player.findOneAndUpdate({ "player_id": player_id },
        { "$push": { "location": location } },
        { new: true },
        (err, player) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send({
                message: "ok",
                data: player
            })
        });
    
});

/**
 * query player based on their name
 */
router.get('/',  (req, res) => {
    const playerName = req.query.name;
    Player.find({ "name": { '$regex': playerName, '$options': 'i' } }, (err, items) => {
        res.status(200).send({
            message: "ok",
            data: items
        })
    });
});

module.exports = router;