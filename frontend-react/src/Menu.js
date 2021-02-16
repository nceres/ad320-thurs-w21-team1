import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Form} from 'react-bootstrap';


class Menu extends React.Component {

    state = { menuItems: [], disabled_id: 1 }

    componentDidMount() {
        fetch("/menu")
            .then(res => res.json())
            .then(menuItems => this.setState({menuItems})).then(ignored => console.log(this.state));
    }

    render() {
        return (
            <div>
                <h1>Menu!</h1>
                <Form>
                {this.state.menuItems.map(menuItem =>
                        <div key={menuItem.hotdog_id} className="mb-3">
                            <Form.Check type={"checkbox"} id={menuItem.hotdog_id}>
                                <Form.Check.Input disabled={menuItem.hotdog_id === this.state.disabled_id} type={"checkbox"} isValid/>
                                <Form.Check.Label>{menuItem.hotdog_name}</Form.Check.Label>
                                <Form.Control.Feedback type="valid">We can display a dynamic message here!</Form.Control.Feedback>
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
