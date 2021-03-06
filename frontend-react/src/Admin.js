import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


class Admin extends React.Component {

    state = {
        logItems: [], tabKey: "1"
    }

    componentDidMount() {
        fetch("/logging")
            .then(res => res.json())
            .then(logItems => this.setState({logItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
    }

    handleSelect = (eventKey) => {
        this.setState({tabKey: eventKey})
        console.log(this.state.tabKey === "1")
    }

    showNewVendorForm() {
        return <form>
            <label>
                <center>New Vendor Account<br/><br/></center>
                Vendor Name: <input type="text"/>
                Vendor Username: <input type="text"/><br/><br/>
                Vendor Role: <input type="text"/>
                Vendor Password: <input type="password"/><br/><br/>
                <input type="button" value="Submit"/>
            </label>
        </form>
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
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>whatever</Nav.Link>
                </Nav>
                {this.state.tabKey === "1" && this.showNewVendorForm()}
                {this.state.tabKey === "2" && this.showAdminLogConsole()}
            </div>
        )
    }
}


export default Admin;
