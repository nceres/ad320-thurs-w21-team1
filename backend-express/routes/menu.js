var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


/* GET home page. */
router.get('/', function(req, res, next) {
    queryUtil.query("select hotdog_id, hotdog_name from Hotdog")
        .then(result => res.send(result));
});

module.exports = router;
