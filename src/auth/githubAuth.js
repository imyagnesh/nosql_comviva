const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('../models/user');
const init = require('./init');

passport.use(
  new GitHubStrategy(
    {
      clientID: 'b9d2f8a29ee6d20f2fb3',
      clientSecret: '390e3b72bbc888e191001d5c57a5b9e8b154980e',
      callbackURL: 'https://www.thespecialcharacter.com',
    },
    function(accessToken, refreshToken, profile, done) {
      const searchQuery = {
        email: profile.email,
      };

      const updates = {
        email: profile.email,
        password: profile.id,
      };

      const options = {
        upsert: true,
      };

      // update the user if s/he exists or add a new user
      User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    },
  ),
);

// serialize user into the session
init();

module.exports = passport;
