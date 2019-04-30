const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * A schema for match collections in the mongodb 
 */

Match = mongoose.model("match", new Schema({}), "match");

module.exports = Match;