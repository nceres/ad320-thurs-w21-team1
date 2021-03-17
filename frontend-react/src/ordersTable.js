import React, { Component } from 'react';
import { Form, Nav, Button } from 'react-bootstrap';




class OrdersTable extends React.Component {

    state = {
        orders: [],

    }




    componentDidMount() {
        fetch('/orders')
            .then(res => {
                res.json().then(body => {
                    console.log(`body: ${JSON.stringify(body)}`);
                    this.setState({ orders: body });
                });
            })
    }


    onClickComplete(orderId) {
        console.log(`Clicked complete on id ${orderId}`)
        fetch('/orders/change_status', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ order_id: orderId })

        })


    };



    render() {
        const cellStyle = { "border": "1px solid white" };
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
                <td><button onClick={() => this.onClickComplete(order.order_id)}>Complete</button></td>
            </tr>
        ));
        return (


            <table style={{ "borderWidth": "1px", "border-spacing": "5px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                <p className="Table-header">ORDERS</p>
                <tr style={{ "border": "1px solid white" }}>
                    <td>Order #</td><td>Date</td><td>Location</td><td>Customer</td><td>Status</td><td>Actions</td>
                </tr>
                {rows}
            </table>


        )
    }
}

export default OrdersTable;