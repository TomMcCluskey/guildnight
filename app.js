var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config.js');

var app = express();

// database setup
var knexConfig = require('./db/knexfile.js');
var knex = require('knex')(knexConfig);
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

app.use('/', routes);
app.use('/users', users);

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
// database setup
var knex = require('knex')({
  client: 'pg',
    connection: {
      host: config.db_host,
      user: config.db_user,
      password: config.db_pass,
      database: config.db_name 
    }
});

database.schema.createTableIfNotExists('accounts', function(table) {
  table.increments('id');
  table.string('name');
  table.string('email');
  table.string('hash');
  table.string('salt');
  table.string('api_key');
});

database.schema.createTableIfNotExists('achieves', function(table) {
  table.increments('id');
  table.string('name');
  table.integer('ap');
  table.string('reward');
  table.boolean('wanted');
});

database.schema.createTableIfNotExists('guilds', function(table) {
  table.increments('id');
  table.string('name');
});

database.schema.createTableIfNotExists('account_achieves', function(table) {
  table.integer('account_id');
  table.integer('achieve_id');
});

database.schema.createTableIfNotExists('account_guilds', function(table) {
  table.integer('account_id');
  table.integer('guild_id');
});

module.exports = app;
