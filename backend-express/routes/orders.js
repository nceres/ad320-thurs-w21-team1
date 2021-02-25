var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");


router.get('/', function(req, res, next) {
  // This is just an example of how this will work. We should delete this whole file
  
  var sql = "SELECT first_name AS First_Name, customer_order.order_id AS Order_No, name AS Location, quantity AS Quantity, hotdog_name AS Item " +
            "FROM person JOIN customer_order ON " +
                        "person.person_id = customer_order.person_id " +
                    "JOIN location ON " + 
                        "customer_order.location_id = location.location_id " +
                    "JOIN order_items ON " + 
                        "customer_order.order_id = order_items.order_id "+
                    "JOIN hotdog ON " + 
                        "order_items.hotdog_id = hotdog.hotdog_id";
  
  queryUtil.query(sql)
  .then(result => res.send(result));

});

module.exports = router;
