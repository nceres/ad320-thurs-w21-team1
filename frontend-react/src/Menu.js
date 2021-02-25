import React, {Component} from 'react';
import {Button, CardDeck, Card} from 'react-bootstrap';


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.handleIncrement.bind(this);
        this.handleDecrement.bind(this);
        this.numberOrdered.bind(this);
        this.onSubmit.bind(this);
    }

    state = {menuItems: [], orderedItems: []}


    componentDidMount() {
        fetch("/menu")
            .then(res => res.json())
            .then(menuItems => this.setState({menuItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
    }

    handleIncrement = (event) => {
        const currentOrders = [...this.state.orderedItems];
        const orderIndex = currentOrders.findIndex(element => element.hotdog_id === event.target.id);
        if (orderIndex !== -1) {
            currentOrders.splice(orderIndex, 1, {
                "hotdog_id": event.target.id,
                "quantity": currentOrders[orderIndex].quantity + 1
            });
        } else {
            currentOrders.push({"hotdog_id": event.target.id, "quantity": 1});
        }
        this.setState({orderedItems: currentOrders});
    }

    handleDecrement = (event) => {
        const currentOrders = [...this.state.orderedItems];
        const orderIndex = currentOrders.findIndex(element => element.hotdog_id === event.target.id);
        if (orderIndex !== -1) {
            if (currentOrders[orderIndex].quantity > 0) {
                currentOrders.splice(orderIndex, 1, {
                    "hotdog_id": event.target.id,
                    "quantity": currentOrders[orderIndex].quantity - 1
                })
            }
            this.setState({orderedItems: currentOrders})
        }
    }

    numberOrdered = (id) => {
        const found = this.state.orderedItems.find(ele => ele.hotdog_id == id);
        return found ? found.quantity : 0;
    }

    onSubmit = () => {
        console.log("doing thing")
        fetch("/orders" , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.orderedItems)
        }).then(result => result.json()).then(json => console.log(json))
}


    render() {
        return (
            <div>
                <CardDeck>
                    {this.state.menuItems.map(menuItem =>
                        <div key={menuItem.hotdog_id}>
                            <Card>
                                <Card.Img
                                    style={{width: "18rem"}}
                                    variant="top"
                                    src="https://i.pinimg.com/originals/5d/c6/38/5dc63889a0b76b9a0ce4bc1eb291ae00.png">
                                </Card.Img>
                                <Card.Body id={menuItem.hotdog_id}>
                                    <Card.Title>{menuItem.hotdog_name}</Card.Title>
                                    {this.numberOrdered(menuItem.hotdog_id) !== 0 &&
                                    <Card.Text>number in cart: {this.numberOrdered(menuItem.hotdog_id)}</Card.Text>
                                    }
                                    <Button variant="outline-dark" onClick={this.handleIncrement}
                                            id={menuItem.hotdog_id}>
                                        +
                                    </Button>
                                    <Button variant="outline-dark" onClick={this.handleDecrement}
                                            id={menuItem.hotdog_id}>
                                        -
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </CardDeck>
                <Button variant="primary" onClick={this.onSubmit}> does thing </Button>
            </div>
        );
    }
}

export default Menu;
