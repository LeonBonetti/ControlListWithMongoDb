var express = require('express');
var router = express.Router();
const dbIn = require('../dbInterations/functions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
  { title: 'Express',
  });
});

module.exports = router;
