var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


router.get('/', function(req, res, next) {
  // This is just an example of how this will work. We should delete this whole file
  queryUtil.query("select * from test_hotdog").then(result => res.send(result));
});

module.exports = router;
