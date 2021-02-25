var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

// get all data for all locations
router.get('/', function(req, res, next) {
    queryUtil.query("SELECT * FROM location").then(result => res.send(result));
});

// get data for a selected vendor/location
router.get('/:id', function(req, res, next) {
    queryUtil.query("SELECT * FROM location WHERE location_id = " + parseInt(req.params.id))
    .then(result => res.send(result));
  });

// get location coordinates for all vendors in lat/long format
router.get('/location', function(req, res, next) {
    queryUtil.query("SELECT latitude, longitude FROM location").then(result => res.send(result));
});

// get location coordinates for specificed vendor in lat/long format
router.get('/:id/location', function(req, res, next) {
    queryUtil.query("SELECT latitude, longitude FROM location WHERE location_id = " + parseInt(req.params.id))
    .then(result => res.send(result));
  });

module.exports = router;