var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',
  passport.authenticate('local',
    {failureFlash: 'Invalid user name or password',
      successRedirect: '/yup',
    failureRedirect: '/nope'})
);

router.post('/register', function(req, res, next) {
  console.log('got registration request');
  console.log('req.username: ' + req.body.username);
  console.log('req.password: ' + req.body.password);
  res.redirect('/');
});

module.exports = router;
