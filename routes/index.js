
module.exports = function (app) {
    app.use('/api/player', require('./player.js'));
    app.use('/api/team', require('./team.js'));
    app.use('/api/match', require('./match.js'));
    app.use('/api/user/register', require('./register.js'));
    app.use('/api/user/login', require('./login.js'));
    app.use('/api/user/fav_players', require('./userFavPlayers.js'));
    app.use('/api/user/fav_teams', require('./userFavTeams.js'));
    app.use('/api/user', require('./user.js'));
    app.use('/api/avatar', require('./avatar.js'));
    app.use('/api/match/user', require('./addMatch.js'));
    app.use('/api/trends/player', require('./playerTrends.js'));
    app.use('/api/trends/team', require('./teamTrends.js'));
};
