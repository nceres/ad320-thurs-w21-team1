import React, {Component} from 'react';
import {Form, Nav, Button} from 'react-bootstrap';

class Vendor extends React.Component {

    state = {
        tabKey: "1"
    }

    handleSelect = (eventKey) => {
        this.setState({tabKey: eventKey})
        console.log(this.state.tabKey === "1")
    }

    render() {
        return (
            <div>
                <Nav fill variant="tabs" className="vendorBar">
                    <Nav.Link eventKey={1} onSelect={this.handleSelect}>Orders</Nav.Link>
                    <Nav.Link eventKey={2} onSelect={this.handleSelect}>Update Location</Nav.Link>
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>Update Menu</Nav.Link>
                </Nav>
            </div>
        )
    }
}

export default Vendor;