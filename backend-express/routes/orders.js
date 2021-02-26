var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

getDate = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

//this is incomplete
router.post('/', function(req, res) {
    ordersArray = req.body;
    ordersArray.forEach(order => {
        //queryUtil.query("INSERT INTO Customer_Order VALUES (NULL, \'" + getDate() + "\', 1, 1)")
        queryUtil.query("INSERT INTO Order_Items VALUES (NULL, " + order.quantity + ", 1, 1)")
    });
    res.send(200)
});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//     console.log(values);
// });

module.exports = router;
