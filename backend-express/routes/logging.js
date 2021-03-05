var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

router.post('/', function(req, res, next) {
    console.log(req.body)
    queryUtil.query("INSERT INTO Logs VALUES (NULL, \'" + req.body.logline + "\', \'" + queryUtil.getDate() + "\')")
        .then(result => res.send(result));
});

module.exports = router;
