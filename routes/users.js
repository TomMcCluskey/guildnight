var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',
    // function(req, res, next) {
  //console.log('got login request');
  //console.log('req.username: ' + req.body.username);
  //console.log('req.password: ' + req.body.password);
  passport.authenticate('local',
    // what is going on here? What is the relevance
    // of this string? No idea where this is running.
    // This seems like it's a separate instance of
    // passport and express from the app.js. Is that
    // right?
    {failureFlash: 'Invalid user name or password',
      successRedirect: '/yup',
    failureRedirect: '/nope'})
  //res.redirect('/');
//}
);

router.post('/register', function(req, res, next) {
  console.log('got registration request');
  console.log('req.username: ' + req.body.username);
  console.log('req.password: ' + req.body.password);
  res.redirect('/');
});

module.exports = router;
