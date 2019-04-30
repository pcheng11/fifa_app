const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * A schema for player collections in the mongodb 
 */
Player = mongoose.model("player", new Schema({
    location: [],
    followers: {
        type: Number,
        default: 0
    }
}), "player");
module.exports = Player;