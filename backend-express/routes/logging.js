var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

router.post('/', function(req, res) {
    queryUtil.query("INSERT INTO Logs VALUES (NULL, \'" + req.body.logline + "\', \'" + queryUtil.getDate() + "\')")
        .then(result => res.send(result));
});

router.get('/', function(req, res) {
    queryUtil.query("SELECT log_line, log_timestamp from Logs")
        .then(result => res.send(result));
});

module.exports = router;
