const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * A schema for user collections in the mongodb 
 */
User = mongoose.model("users", new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    Create_date: {
        type: Date,
        default: Date.now
    },
    fav_players: {
        type: Array,
        default: []
    },
    fav_teams: {
        type: Array,
        default: []
    },
    lng: {
        type: Number,
        default: 0
    },
    lat: {
        type: Number,
        default: 0
    },
    added_matches: {
        type: Array,
        default: []
    }
}));
module.exports = User;