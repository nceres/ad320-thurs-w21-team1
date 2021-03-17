import React, {Component} from 'react';
import {Form, Nav, Button} from 'react-bootstrap';
import OrdersTable from './ordersTable';
import logHelper from './utils'

class Vendor extends React.Component {

    state = {
        tabKey: "1",
        orders: [],
        newLatitude: 0,
        newLongitude: 0
    }

    handleSelect = (eventKey) => {
        this.setState({tabKey: eventKey})
        console.log(this.state.tabKey === "1")
    }

    componentDidMount() {
        fetch("/logging")
            .then(res => res.json())
            .then(logItems => this.setState({logItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
    }

    showUpdateLocationForm() {
        return <Form onSubmit={this.updateVendorLocation}>
            <Form.Label>New Latitude</Form.Label>
            <Form.Control type="text" placeholder="decimal format, e.g. 50.12345" className="userInput"
                          onChange={(e) => this.setState({newLatitude: e.target.value})} required/>
            <Form.Label>New Longitude</Form.Label>
            <Form.Control type="text" placeholder="decimal format, e.g. 50.12345" className="userInput"
                          onChange={(e) => this.setState({newLongitude: e.target.value})} required/>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    }

    updateVendorLocation = () => {
        logHelper({logline: `Vendor user ${this.props.user.person_id} updated their cart location!`})
        const newLocation = {
            latitude: this.state.newLatitude,
            longitude: this.state.newLongitude
        }
        fetch(`vendors/${this.props.user.person_id}/location`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newLocation)
        }).then(result => result.json())
    }


    render() {
        return (
            <div>
                <Nav fill variant="tabs" className="vendorBar">
                    <Nav.Link eventKey={1} onSelect={this.handleSelect}>Orders</Nav.Link>
                    <Nav.Link eventKey={2} onSelect={this.handleSelect}>Update Location</Nav.Link>
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>Update Menu</Nav.Link>
                </Nav>
                {this.state.tabKey === "1" && <OrdersTable/>}
                {this.state.tabKey === "2" && this.showUpdateLocationForm()}
            </div>
        )
    }
}

export default Vendor;