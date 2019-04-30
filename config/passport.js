var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    mongoose = require("mongoose"),
    secrects = require("secrects.js"),
    User = require("../models/UserSchema.js");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secrects.secretOrKey; // similar to the signature

/**
 * 
 * @param {passport} passport 
 * This part is implemented but is not used
 * This function is for user authentication purpose
 */
module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};