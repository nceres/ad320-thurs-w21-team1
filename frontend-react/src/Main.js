import React, {Component} from 'react';
import fire from '../src/config/Fire';
import Login from '../src/components/LoginRegister';
import LogOut from './components/LogOut';
import Popup from 'reactjs-popup';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import {Button, ButtonGroup} from "react-bootstrap";
import Home from './Home';
import Menu from './Menu';
import Contact from './Contact';
import MapContainer from './MapContainer';
import Admin from './Admin';
import Vendor from './Vendor';

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            user: [{role_name: "Customer"}],
            selectedView: "Customer"
        }
    }

    handleOnClick = (viewClicked) => {
        this.setState({selectedView: viewClicked});
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                fetch("/users/" + user.email)
                    .then(res => res.json())
                    .then(user => {
                        this.setState({user})
                    })
            } else {
                this.setState({user:null});
            }
        });
    }

    validateUser = () => {
        return this.state.user && this.state.user.length > 0;
    }

    getUserOrDefault = () => {
        if (this.validateUser()) {
            return this.state.user[0];
        } else {
            return {role_name: "Customer"}
        }
    }


    render() {
        return (
            <HashRouter>
                <ButtonGroup className="login">
                    <Popup trigger={<button className="login"> Login</button>} position="left center">
                        <div className="logout">
                            {this.state.user ? (<LogOut/>) : (<Login/>)}
                        </div>
                    </Popup>
                </ButtonGroup>
                <div className="container">
                    <h1 className="mainTitle">Dog Eat Dog World</h1>
                    <ul className="headerMenu">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mapContainer">Map</NavLink></li>
                        {this.getUserOrDefault().role_name === "Admin" && <li><NavLink to="/admin">Admin</NavLink></li>
                        }
                        {true && <li><NavLink to="/vendor">Vendor</NavLink></li>
                        }
                    </ul>
                    <div className="contents">
                        <Route exact path="/" component={() => <Home user={this.getUserOrDefault()}/>}></Route>
                        <Route path="/menu" component={() => <Menu user={this.getUserOrDefault()}/>}></Route>
                        <Route path="/contact" component={Contact}></Route>
                        <Route path="/mapContainer"
                               component={() => <MapContainer user={this.getUserOrDefault()}/>}></Route>
                        <Route path="/admin" component={() => <Admin user={this.getUserOrDefault()}/>}></Route>
                        <Route path="/vendor" component={() => <Vendor user={this.getUserOrDefault()}/>}></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;
