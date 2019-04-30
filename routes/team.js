var mongoose = require('mongoose'),
    express = require('express'),
    Team = require('../models/TeamSchema.js')
    router = express.Router();


/**
 * Handle team query based on team's name
 */

router.get('/:team_id', (req, res) => {
    const team_id = req.params.team_id;
    Team.findOne({ "team_id": team_id }, (err, items) => {
        res.status(200).send({
            message: "ok",
            data: items
        })
    });
});

/**
 * query player based on their name
 */
router.get('/', (req, res) => {
    const teamTeam = req.query.name;
    Team.find({ "name": { '$regex': teamTeam, '$options': 'i' } }, (err, items) => {
        res.status(200).send({
            message: "ok",
            data: items
        })
    });
});

/**
 * Put the location of the player only when the user search and click it
 */
router.put('/:team_id', (req, res) => {
    const team_id = req.params.team_id;
    const location = req.body.location

    Team.findOneAndUpdate({ "team_id": team_id },
        { "$push": { "location": location } },
        { new: true },
        (err, team) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send({
                message: "ok",
                data: team
            })
        });

});

module.exports = router;