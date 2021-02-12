import React, { Component } from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callBackend() {
        console.log("api called");
        fetch("http://localhost:4000/users")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.callBackend();
    }

    render() {
        return (
            <div>
                <p className="App-intro">{this.state.apiResponse}</p>
                <h2>Hey, you're home!</h2>
                <p>This is a bunch of text!</p>
                <p>This a bunch more text!</p>
            </div>
        );
    }
}

export default Home;
