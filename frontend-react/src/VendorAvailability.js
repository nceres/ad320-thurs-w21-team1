import React, { Component } from 'react';
import {Form} from "react-bootstrap";
import logHelper from "./utils";
class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
    }
    markUnavailable = () => {
        logHelper({logline:"Vendor marked self unavailable"})
    }
    render() {
        return (
            <div className="toggle-switch">
                {this.props.user.person_id}
                <Form>
                        <Form.Check
                            onChange={() => this.markUnavailable()}
                            type="switch"
                            id={"id"}
                            label={"Switch the toggle off to make yourself unavailable"}
                            key={"toggle"}
                        />
                </Form>
            </div>
        );
    }
}
export default ToggleSwitch;
