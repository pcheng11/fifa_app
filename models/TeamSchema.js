const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * A schema for team collections in the mongodb 
 */

Team = mongoose.model("team", new Schema({
    location: [],
    followers: {
        type: Number,
        default: 0
    }
}), "team");

module.exports = Team;