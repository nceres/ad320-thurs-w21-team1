var express = require('express');
var router = express.Router();
const queryUtil = require("../db-utils/queryUtil");



// function to get date
getDate = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

// get all orders
router.get('/', function (req, res) {
    queryUtil.query("SELECT order_id, DATE_FORMAT(date, '%M %d %Y %H-%m-%s') AS 'Date', location.name as 'Location', CONCAT(person.first_name, ' ', last_name) as 'Name', case complete when 0 then 'processing' else 'complete' end as 'Status' FROM hotdogcart.Customer_Order inner join hotdogcart.location using (location_id) inner join hotdogcart.person using (person_id)")
        .then(result => res.send(result));
});

// get order items
router.get('/order_items', function (req, res) {
    const order_id = req.body.order_id;
    queryUtil.query("select distinct hotdog_name, quantity from hotdogcart.order_items join hotdogcart.customer_order using(order_id) join hotdogcart.hotdog using(hotdog_id) where order_id = " + order_id)
        .then(result => res.send(result));
}
);

router.get('/:id/order_items', function (req, res) {
    const order_id = req.params.id;
    queryUtil.query("select distinct hotdog_name as 'Name', quantity as 'Quantity', hotdog_price as 'Price' from hotdogcart.order_items join hotdogcart.customer_order using(order_id) join hotdogcart.hotdog using(hotdog_id) where order_id = " + order_id)
        .then(result => res.send(result));
}
);

// change order status
router.post('/change_status', async (req, res) => {
    const order_id = req.body.order_id;
    console.log(`req ${JSON.stringify(req.body)}`)
    await queryUtil.query("UPDATE hotdogcart.customer_order SET complete = not complete WHERE order_id = " + parseInt(order_id));

    const result = await queryUtil.query("SELECT order_id, DATE_FORMAT(date, '%M %d %Y %H-%m-%s') AS 'Date', location.name as 'Location', CONCAT(person.first_name, ' ', last_name) as 'Name', case complete when 0 then 'processing' else 'complete' end as 'Status' FROM hotdogcart.Customer_Order inner join hotdogcart.location using (location_id) inner join hotdogcart.person using (person_id)");
    res.send(result);
});

// get orders for a specific vendor/location
router.get('/:id', function (req, res) {
    queryUtil.query("SELECT * FROM Customer_Order WHERE location_id = " + parseInt(req.params.id))
        .then(result => res.send(result));
});

// place an order with a vendor
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
        " (NULL, \'" + queryUtil.getDate() + "\', " + vendorId + ", 1, false)")
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
