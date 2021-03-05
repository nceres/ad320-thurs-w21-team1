var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");

router.post('/', function (req, res) {

    const ordersArray = req.body;
    if (ordersArray === undefined || ordersArray.length == 0) {
        // shouldn't be able to send an empty array, it's a bad request.
        console.log("empty orders array!");
        res.sendStatus(400);
    }
    const vendorId = ordersArray[0].vendor_id;
    // we know that there is at least one order, so we can make the Customer_Order with a single element of the list.
    queryUtil.query("INSERT INTO Customer_Order VALUES" +
        " (NULL, \'" + queryUtil.getDate() + "\', " + vendorId + ", 1)")
        .catch(err => console.log("error inserting order " + err))
        .finally(ignored => {
            queryUtil.query("SELECT MAX(order_id) AS maxId FROM Customer_Order")
                .then(result => result[0].maxId)
                .then(maxId => ordersArray
                    .forEach(order => {
                        console.log(order)
                        queryUtil.query("INSERT INTO Order_Items VALUES (NULL, " + order.quantity + ", " + maxId + ", " + order.hotdog_id + ")")
                            .catch(err => console.log("error inserting order item " + err))
                    }));
        })
});

module.exports = router;
