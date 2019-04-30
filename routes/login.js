var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require("bcryptjs"),
    secrets = require("../config/secrets.js"), 
    User = require('../models/UserSchema.js'),
    jwt = require("jsonwebtoken");

/**
 *  Handle request: Login
 */
router.post("/", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailNotFound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                // Sign token
                jwt.sign(
                    payload,
                    secrets.secretOrKey,
                    {
                        // 1 hour in seconds
                        expiresIn: 3600 
                    },
                    (err, token) => {
                        res.status(200).send({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).send({ pwdIncorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;