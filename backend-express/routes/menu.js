var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

// get master menu
router.get('/', function(req, res) {
    queryUtil.query("SELECT hotdog_id, hotdog_name, hotdog_price FROM Hotdog WHERE deleted = false")
        .then(result => res.send(result));
});

// get menu for a specific vendor (checks to see if items are disabled)
router.get('/:id', function(req, res) {
    queryUtil.query("SELECT * FROM hotdog WHERE deleted = false AND hotdog_id NOT IN (SELECT hotdog_id FROM Disabled_Menu_Items WHERE location_id = \'" + req.params.id + "\')")
        .then(result => res.send(result));
});

// add an item to the master menu
router.post('/', function(req, res) {
    queryUtil.query("INSERT INTO hotdog VALUES" + "(NULL, \'" + req.body.hotdog_name + "\', \'" + req.body.hotdog_image + "\', " + req.body.hotdog_price + ", false)")
    .catch(err => console.log("error inserting vendor " + err))
    .finally(res.send("Menu item added successfully"));
});

router.put('/', function(req, res) {
    req.body.forEach(idToDelete => {
        queryUtil.query("UPDATE hotdog SET deleted = true WHERE hotdog_id = " + idToDelete);
    })
});

module.exports = router;
