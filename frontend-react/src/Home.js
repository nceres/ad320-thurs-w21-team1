import React, { Component } from 'react';
import fire from '../src/config/Fire';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callBackend() {
        console.log("api called");
        fetch("/users")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.callBackend();
    }

    logout = () => {
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div>
                <h2>Hey, you're home!</h2>
                <p>This is a bunch of text!</p>
                <p>This a bunch more text!</p>
            </div>
        );
    }
}

export default Home;
