import React, {Component} from 'react';
import fire from '../config/Fire';

class LogOut extends Component {

    logout = () => {
        fire.auth().signOut();
    }

    render(){
        return(
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default LogOut;