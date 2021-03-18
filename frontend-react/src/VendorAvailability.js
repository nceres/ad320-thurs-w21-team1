import React, { Component } from 'react';

class ToggleSwitch extends Component {
    render() {
        return (
            <div className="toggle-switch">
                <input type="checkbox" checked data-toggle="toggle" data-on="Ready" data-off="Not Ready" data-onstyle="success" data-offstyle="danger" />

            </div>
        );
    }
}

export default ToggleSwitch;