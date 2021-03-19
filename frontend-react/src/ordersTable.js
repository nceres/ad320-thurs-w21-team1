import React, { Component } from 'react';
import { Form, Nav, Button, Modal } from 'react-bootstrap';




class OrdersTable extends React.Component {

    state = {
        orders: [],
        orderItems: null
    }

    componentDidMount() {
        fetch('/orders')
            .then(res => {
                res.json().then(body => {
                    this.setState({ orders: body });
                });
            })
    }

    showOrderItems(orderId) {
        fetch(`/orders/${orderId}/order_items`).then(res => {
            res.json().then(orderItems => {
                console.log(JSON.stringify(orderItems));
                this.setState({ orderItems: orderItems });

            });

        });


    }

    onClickComplete(orderId) {
        console.log(`Clicked complete on id ${orderId}`)
        fetch('/orders/change_status', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ order_id: orderId })
        }).then(result => {
            result.json().then(orders => this.setState({ orders: orders }))
        });

    };
    onHideOrderItems() {
        this.setState({ orderItems: null });
    }



    render() {
        //const cellStyle = { "border": "1px solid white" };
        if (!this.state.orders) {
            return;
        }
        const rows = this.state.orders.map(order => (
            <tr>
                <td>{order.order_id}</td>
                <td>{order.Date}</td>
                <td>{order.Location}</td>
                <td>{order.Name}</td>
                <td>{order.Status}</td>
                <td>
                    <button onClick={() => this.showOrderItems(order.order_id)}>Show Items</button>
                    <button onClick={() => this.onClickComplete(order.order_id)}>Complete</button>
                </td>
            </tr>
        ));



        return (
            <div>


                {this.state.orderItems &&
                    <Modal show={this.state.orderItems !== null} onHide={this.onHideOrderItems.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Items included: </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <table>
                                <p className="Table-header">ORDER'S ITEMS</p>
                                <tr>
                                    <td>Name</td><td>Quantity</td><td>Price</td><td>Total Cost</td>
                                </tr>
                                {this.totalCost = 0}
                                {this.state.orderItems.map(orderItem => (
                                    this.cost = (orderItem.Price * orderItem.Quantity),
                                    this.totalCost += this.cost,

                                    <tr>
                                        <td>{orderItem.Name}</td>
                                        <td>{orderItem.Quantity}</td>
                                        <td>{orderItem.Price}</td>
                                        <td>{this.cost}</td>


                                    </tr>
                                ))}


                            </table>
                            <br></br>
                            <h1><b>Final Price: ${this.totalCost}</b></h1>



                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.onHideOrderItems.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }

                <table>
                    <p className="Table-header">ORDERS</p>
                    <tr style={{ "border": "1px solid white" }}>
                        <td>Order #</td><td>Date</td><td>Location</td><td>Customer</td><td>Status</td><td>Actions</td>
                    </tr>
                    {rows}

                </table>
            </div>


        )
    }
}

export default OrdersTable;
