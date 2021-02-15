import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Form} from 'react-bootstrap';


class Menu extends React.Component {

    state = {menuItems: []}

    componentDidMount() {
        fetch("/menu")
            .then(res => res.json())
            .then(menuItems => this.setState({menuItems}));
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <Form>
                {this.state.menuItems.map(menuItem =>
                        <div key={"checkbox"} className="mb-3">
                            <Form.Check type={"checkbox"} id={`check-api-radio`}>
                                <Form.Check.Input type={"checkbox"} isValid/>
                                <Form.Check.Label>{`Custom api`}</Form.Check.Label>
                                <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                            </Form.Check>
                        </div>
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
        );
    }
}


export default Menu;
