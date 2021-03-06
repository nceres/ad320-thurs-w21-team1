var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

// get master menu
router.get('/', function(req, res) {
    queryUtil.query("SELECT hotdog_id, hotdog_name, hotdog_price FROM Hotdog")
        .then(result => res.send(result));
});

// get menu for a specific vendor (checks to see if items are disabled)
router.get('/:id', function(req, res) {
    queryUtil.query("SELECT * FROM hotdog WHERE hotdog_id NOT IN (SELECT hotdog_id FROM Disabled_Menu_Items WHERE location_id = \'" + req.params.id + "\')")
        .then(result => res.send(result));
});

// add an item to the master menu
router.post('/', function(req, res) {
    console.log("hit menu post")
    queryUtil.query("INSERT INTO hotdog VALUES" + "(NULL, \'" + req.body.hotdog_name + "\', \'" + req.body.hotdog_image + "\', " + req.body.hotdog_price + ")")
    .catch(err => console.log("error inserting vendor " + err))
    .finally(res.send("Menu item added successfully"));
});

module.exports = router;
