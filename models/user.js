var config = require('../config.js');

var User = function() {
  this.email = "";
  this.password = "";
  this.id = 0;

  this.save = function(callback) {
    // saves the user in the db
  };

};

User.findOne = function() {
  // finds the first user with the relevant email
};

User.findById = function() {
  // finds a user by unique ID
};

module.exports = User;
