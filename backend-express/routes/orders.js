var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


router.get('/', function(req, res, next) {
  // This is just an example of how this will work. We should delete this whole file
  
  var sql = "SELECT hotdog_name AS Hotdog, quantity AS Quantity " +
            "FROM test_hotdog JOIN test ON test_hotdog.hotdog_id = test.hotdog_id";
  
  queryUtil.query(sql)
  .then(result => res.send(result));

});

module.exports = router;
