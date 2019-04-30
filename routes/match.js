var mongoose = require('mongoose'),
    express = require('express'),
    Match = require('../models/MatchSchema.js'),
    router = express.Router();

/**
 * Handle request such as getting match info of a team based
 * on the team's team id
 */
router.get('/:team_id', (req, res) => {
    const team_id = req.params.team_id;
    Match.findOne({ "team_id": team_id }, (err, item) => {
        res.status(200).send({
            message: "ok",
            data: item
        })
    });
});

module.exports = router;