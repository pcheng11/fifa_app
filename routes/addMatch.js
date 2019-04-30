var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    router = express.Router();


router.post("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const match_name = req.body.match;
    User.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(user_id) },
        { "$push": { "added_matches": match_name } },
        { new: true },
        (err, user) => {
            if (err) {
                res.status(500).send(err)
            }
        });
    });

router.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    User.findOne(
        { "_id": mongoose.Types.ObjectId(user_id) },
        (err, user) => {
            if (err) {
                res.status(500).send(
                    err
                )
            }
            res.status(200).send({
                data: user.added_matches
            });
        });
});

module.exports = router;