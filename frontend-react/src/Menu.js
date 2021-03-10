import React, {Component} from 'react';
import {Button, CardDeck, Card} from 'react-bootstrap';
import logHelper from "./utils";


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.handleIncrement.bind(this);
        this.handleDecrement.bind(this);
        this.numberOrdered.bind(this);
        this.onSubmit.bind(this);
    }

    state = {menuItems: [], orderedItems: [], orderTotal: 0}

    componentDidMount() {
        fetch("/menu/" + this.props.vendorId)
            .then(res => res.json())
            .then(menuItems => this.setState({menuItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
    }

    handleIncrement = (hotdogId, price) => {
        const currentOrders = [...this.state.orderedItems];
        const orderIndex = currentOrders.findIndex(element => element.hotdog_id === hotdogId);
        if (orderIndex !== -1) {
            currentOrders.splice(orderIndex, 1, {
                "hotdog_id": hotdogId,
                "quantity": currentOrders[orderIndex].quantity + 1,
                "vendor_id": this.props.vendorId
            });
        } else {
            currentOrders.push({"hotdog_id": hotdogId, "quantity": 1, "vendor_id": this.props.vendorId});
        }
        const newOrderTotal = this.state.orderTotal + parseFloat(price);
        this.setState({orderedItems: currentOrders, orderTotal: newOrderTotal});
    }

    handleDecrement = (hotdogId, price) => {
        let newOrderTotal = this.state.orderTotal;
        const currentOrders = [...this.state.orderedItems];
        if (currentOrders.length > 0) {
            const orderIndex = currentOrders.findIndex(element => element.hotdog_id === hotdogId);
            if (orderIndex !== -1) {
                if (currentOrders[orderIndex].quantity > 0) {
                    currentOrders.splice(orderIndex, 1, {
                        "hotdog_id": hotdogId,
                        "quantity": currentOrders[orderIndex].quantity - 1,
                        "vendor_id": this.props.vendorId
                    })
                    newOrderTotal -= price;
                    this.setState({orderedItems: currentOrders, orderTotal: newOrderTotal})
                }
            }
        }
    }

    numberOrdered = (id) => {
        const found = this.state.orderedItems.find(ele => ele.hotdog_id == id);
        return found ? found.quantity : 0;
    }

    onSubmit = () => {
        //first thing we do is close modal because that is only customer facing action
        this.props.showModal();
        if (this.state.orderedItems.length > 0) {
            logHelper({logline: "order submitted at location " + this.state.orderedItems[0].vendor_id})
            fetch("/orders", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state.orderedItems)
            }).then(result => result.json())
        }
    }


    render() {
        return (
            <div id="carddecdiv">
                <CardDeck>
                    {this.state.menuItems.map(menuItem =>
                        <div key={menuItem.hotdog_id}>
                            <Card>
                                <Card.Img id={menuItem.hotdog_id}                                   
                                   src={menuItem.hotdog_image}>
                                </Card.Img>
                                <Card.Body id={menuItem.hotdog_id}>
                                    <Card.Title>{menuItem.hotdog_name}</Card.Title>
                                    {this.numberOrdered(menuItem.hotdog_id) !== 0 &&
                                    <Card.Text>number in cart: {this.numberOrdered(menuItem.hotdog_id)}</Card.Text>
                                    }
                                    <Button variant="outline-dark"
                                            onClick={() => this.handleIncrement(menuItem.hotdog_id, menuItem.hotdog_price)}>
                                        +
                                    </Button>
                                    <Button variant="outline-dark"
                                            onClick={() => this.handleDecrement(menuItem.hotdog_id, menuItem.hotdog_price)}>
                                        -
                                    </Button>
                                </Card.Body>
                                <Card.Footer>${menuItem.hotdog_price}</Card.Footer>
                            </Card>
                        </div>
                    )}
                </CardDeck>
                <Button variant="primary" onClick={this.onSubmit}> Submit your order!
                    ${this.state.orderTotal.toFixed(2)} </Button>
            </div>
        );
    }
}

export default Menu;
