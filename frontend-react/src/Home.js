import React, {Component} from 'react';
import fire from '../src/config/Fire';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>This is your current role: {this.props.user.role_name}</h2>
                <h2>This is your current ID: {this.props.user.person_id || "no id"}</h2>
                <p>This is a bunch of text!</p>
                <p>This a bunch more text!</p>
            </div>
        );
    }
}

export default Home;
