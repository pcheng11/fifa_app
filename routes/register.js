var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require("bcryptjs"),
    User = require('../models/UserSchema.js')


/**
 * Handle user's register functionality
 */
router.post("/", (req, res) => {
    // if name and pwd are entered
    if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.name;
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            return res.status(400).send({ emailExists: "Email already exists" });
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.status(200).send(user))
                    .catch(err => console.log(err));
            });
        });
    });
});

module.exports = router;