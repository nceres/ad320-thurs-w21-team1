var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


router.get('/', function(req, res, next) {
  // This is just an example of how this will work. We should delete this whole file
  queryUtil.query("SELECT concat(first_name,' ' , last_name) AS Admin_Name FROM hotdogcart.person JOIN hotdogcart.person_role ON person.role_id = person_role.person_role_id WHERE person_role.role_name = 'Admin'")
  .then(result => res.send(result));
});

module.exports = router;
