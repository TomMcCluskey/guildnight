var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, db) {
  passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing user');
    User.findOne(id).success(function(user) { done(null, user); });
  });

  // authetication setup
  passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  function(username, password, done) {

    User.findOne({ where: { username : username } }).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect email address.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  ));
};
