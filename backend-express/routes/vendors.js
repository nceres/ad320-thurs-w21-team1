var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

// get all data for all vendors/locations
router.get('/', function(req, res) {
    queryUtil.query("SELECT * FROM location").then(result => res.send(result));
});

// get data for a selected vendor/location
router.get('/:id', function(req, res) {
    queryUtil.query("SELECT * FROM location WHERE location_id = " + parseInt(req.params.id))
    .then(result => res.send(result));
});

// get location coordinates for all vendors in lat/long format
router.get('/location', function(req, res) {
    queryUtil.query("SELECT latitude, longitude FROM location").then(result => res.send(result));
});

// get location coordinates for specified vendor in lat/long format
router.get('/:id/location', function(req, res) {
    queryUtil.query("SELECT latitude, longitude FROM location WHERE location_id = " + parseInt(req.params.id))
    .then(result => res.send(result));
});

// add a new vendor
router.post('/', function(req, res) {
    queryUtil.query("INSERT INTO location VALUES" + "(NULL, \'" + req.body.name + "\', \'" + req.body.address +
        "\', \'" + req.body.phone + "\', " + req.body.latitude + ", " + req.body.longitude + ")")
        .catch(err => console.log("error inserting vendor " + err))
        .finally(res.send("Vendor added successfully"));
});

// update specified vendor information
router.put('/:id', function(req, res) {
    queryUtil.query("UPDATE location SET name = " + "\'" + req.body.name + "\', address = \'" + req.body.address + 
        "\', phone = \'" + req.body.phone + "\' WHERE location_id =" + parseInt(req.params.id))
        .catch(err => console.log("error updating vendor " + err))
        .finally(res.send("Vendor " + req.params.id + " information updated"));
      });

// update specified vendor location
router.put('/:id/location', function(req, res) {
    queryUtil.query("UPDATE location SET latitude = " + req.body.latitude + ", longitude = " + req.body.longitude + 
        "WHERE location_id = "  + parseInt(req.params.id))
        .catch(err => console.log("error inserting vendor " + err))
        .finally(res.send("Vendor " + req.params.id + " location updated"));
});

// delete specified vendor
router.delete('/:id', function(req, res) {
    queryUtil.query("DELETE FROM location WHERE location_id = " + parseInt(req.params.id))
        .catch(err => console.log("error inserting vendor " + err))
        .finally(res.send("Vendor " + req.params.id + " deleted"));
});

module.exports = router;