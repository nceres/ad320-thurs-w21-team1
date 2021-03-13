var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


router.get('/', function(req, res) {
  queryUtil.query("SELECT concat(first_name,' ' , last_name) AS Admin_Name FROM hotdogcart.person JOIN hotdogcart.person_role ON person.role_id = person_role.person_role_id WHERE person_role.role_name = 'Admin'")
      .then(result => res.send(result));
});


router.get('/:email', function(req, res) {
  queryUtil.query("SELECT person_id, role_name from Person JOIN Person_Role ON Person.role_id = Person_Role.person_role_id WHERE email = \'" + req.params.email + "\'")
      .then(result => res.send(result));
});


module.exports = router;
