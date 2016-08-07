var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// database setup
var knexSettings = require('./settings/knexfile.js');
var knex = require('knex')(knexSettings);
app.set('database', knex);
var database = app.get('database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.cookie_secret,
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);

var User = require('./models/user.js');

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('setting up DB');

module.exports = app;
