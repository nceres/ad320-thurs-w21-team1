import React, {Component} from 'react';
import {Form, Nav, Button} from 'react-bootstrap';
import logHelper from "./utils";

class Admin extends React.Component {

    state = {
        logItems: [],
        tabKey: "1",
        // add new hotdog
        newHotdogName: "",
        newHotdogImgUrl: "",
        newHotdogPrice: 0,
        // menu
        menuItemsToDelete: [],
        masterMenuItems: [],
        // add new vendor
        newName: "",
        newAddress: "",
        newPhone: "",
        newLatitude: 0,
        newLongitude: 0
    }

    componentDidMount() {
        fetch("/logging")
            .then(res => res.json())
            .then(logItems => this.setState({logItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
        fetch("/menu")
            .then(res => res.json())
            .then(masterMenuItems => this.setState({masterMenuItems}))

    }

    handleSelect = (eventKey) => {
        this.setState({tabKey: eventKey})
        console.log(this.state.tabKey === "1")
    }

    showNewVendorForm() {
        return <Form onSubmit={this.createNewVendor}>
            <Form.Label>Location Name</Form.Label>
            <Form.Control placeholder="address" className="userInput" onChange={(e) => this.setState({newName: e.target.value})}
                          required/>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="address" className="userInput" onChange={(e) => this.setState({newAddress: e.target.value})}
                          required/>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="phone" className="userInput" onChange={(e) => this.setState({newPhone: e.target.value})}
                          required/>
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="text" placeholder="decimal format, e.g. 50.12345" className="userInput"
                          onChange={(e) => this.setState({newLatitude: e.target.value})} required/>
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="text" placeholder="decimal format, e.g. 50.12345" className="userInput"
                          onChange={(e) => this.setState({newLongitude: e.target.value})} required/>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    }

    createNewVendor = (event) => {
        logHelper({adminAction: `Admin user ${this.props.user.person_id} added a new vendor!`})
        const newVendor = {
            name: this.state.newName,
            address: this.state.newAddress,
            phone: this.state.newPhone,
            latitude: this.state.newLatitude,
            longitude: this.state.newLongitude
        }
        fetch("/vendors", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newVendor)
        }).then(result => result.json())
    }
       
    addMenuItem = () => {
        logHelper({adminAction: "Admin created a new hotdog!"}) // TODO add some details here
        const newHotDog = {
            hotdog_name: this.state.newHotdogName,
            hotdog_image: this.state.newHotdogImgUrl,
            hotdog_price: this.state.newHotdogPrice
        }
        fetch("/menu", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newHotDog)
        }).then(result => result.json())
    }

    showAddMenuItemForm() {
        return <Form onSubmit={this.addMenuItem}>
            <Form.Label>Hotdog Name</Form.Label>
            <Form.Control placeholder="some name" className="userInput" onChange={(e) => this.setState({newHotdogName: e.target.value})}
                          required/>
            <Form.Label>Image Url</Form.Label>
            <Form.Control placeholder="some name" className="userInput" onChange={(e) => this.setState({newHotdogImgUrl: e.target.value})}
                          required/>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="decimal format, e.g. 1.20" className="userInput"
                          onChange={(e) => this.setState({newHotdogPrice: e.target.value})} required/>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    }

    stageRemoveItem = (isChecked, id) => {
        console.log("this is val: " + isChecked)
        console.log("this is id: " + id)
        const newRemoveItems = [...this.state.menuItemsToDelete]
        if (!isChecked) {
            this.setState({menuItemsToDelete: newRemoveItems.filter(ele => ele !== id)});
        } else {
            newRemoveItems.push(id);
            this.setState({menuItemsToDelete: newRemoveItems});
        }
    }

    removeMenuItems = () => {
        console.log("this is to be removed: " + this.state.menuItemsToDelete )
        logHelper({logline: "Admin deleted following menu items " + this.state.menuItemsToDelete})
        fetch("/menu", {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.menuItemsToDelete)
        }).then(result => result.json())
    }

    showMenuItemRemoveForm() {
        return <Form onSubmit={this.removeMenuItems}>
            {this.state.masterMenuItems.map(menuItems => {
                return <Form.Check
                    onChange={(e) => this.stageRemoveItem(e.target.checked, e.target.id)}
                    type="switch"
                    id={menuItems.hotdog_id} // maybe don't duplicate id and key
                    label={menuItems.hotdog_name}
                    key={menuItems.hotdog_id} // maybe just need this?
                />
            })}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    }

    showAdminLogConsole() {
        return <p className="consoleLog">
            {this.state.logItems.map(item => <div>{item.log_timestamp + '\t' + item.log_line}</div>)}
        </p>
    }

    render() {
        return (
            <div>
                <Nav fill variant="tabs" className="adminBar">
                    <Nav.Link eventKey={1} onSelect={this.handleSelect}>Add Vendor</Nav.Link>
                    <Nav.Link eventKey={2} onSelect={this.handleSelect}>View Console</Nav.Link>
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>Add Menu Item</Nav.Link>
                    <Nav.Link eventKey={4} onSelect={this.handleSelect}>Remove Menu Item</Nav.Link>
                </Nav>
                {this.state.tabKey === "1" && this.showNewVendorForm()}
                {this.state.tabKey === "2" && this.showAdminLogConsole()}
                {this.state.tabKey === "3" && this.showAddMenuItemForm()}
                {this.state.tabKey === "4" && this.showMenuItemRemoveForm()}
            </div>
        )
    }
}


export default Admin;
