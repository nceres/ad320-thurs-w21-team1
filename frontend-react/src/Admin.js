import React, {Component} from 'react';


class Admin extends React.Component {

    state = {
        logItems: []
    }

    componentDidMount() {
        fetch("/logging")
            .then(res => res.json())
            .then(logItems => this.setState({logItems}))
            .then(ignored => console.log(this.state)); // remove this log statement at some point
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <center>New Vendor Account<br/><br/></center>
                        Vendor Name: <input type="text"/>
                        Vendor Username: <input type="text"/><br/><br/>
                        Vendor Role: <input type="text"/>
                        Vendor Password: <input type="password"/><br/><br/>
                        <input type="button" value="Submit"/>
                    </label>
                </form>
                <p className="consoleLog">
                    {this.state.logItems.map(item => <div>{item.log_timestamp + '\t' + item.log_line}</div>)}
                </p>
            </div>
        )
    }
}


export default Admin;
