var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

/* GET home page. */
router.get('/', function(req, res, next) {
    queryUtil.query("select hotdog_name from Hotdog")
        .then(result => res.json(result.map(result => result.hotdog_name)));
});

module.exports = router;
