var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.log('got login request');
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  console.log('got registration request');
  res.redirect('/');
});

module.exports = router;
