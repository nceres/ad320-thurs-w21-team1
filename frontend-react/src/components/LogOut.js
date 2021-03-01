import React, {Component} from 'react';
import fire from '../config/Fire';

class LogOut extends Component {

    logout = () => {
        fire.auth().signOut();
    }

    render(){
        return(
            <div>
                <h1>Login Page</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default LogOut;