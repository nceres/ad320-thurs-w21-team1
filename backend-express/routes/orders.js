var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

//this is incomplete
router.post('/', function(req, res) {
    console.log(req.body);
    ordersArray = req.body;
    ordersArray.forEach(order => queryUtil.query("INSERT INTO Order_Items VALUES (NULL, " + order.quantity + ", 1, 1)"));
});

module.exports = router;
