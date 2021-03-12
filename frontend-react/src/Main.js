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
import logHelper from "./utils";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {id: -1, role_name: "customer"},
            selectedView: "Customer"
        }
    }

    handleOnClick = (viewClicked) => {
        this.setState({selectedView: viewClicked});
    }

    componentDidMount() {
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
          if(user){
              fetch("/users/" + user.email)
                  .then(res => res.json())
                  .then(user => {
                      logHelper("user with email " + user.email + " logged in")
                      this.setState({user})
                  })
          } else {
            this.setState({user:null});
          }
        });
      }


    currentUserRoleName = () => {
        if (this.state.user[0]) {
            return this.state.user[0].role_name

        } else {
            return "Customer";
        }

    }

    render() {
        return (
            <HashRouter>
                <div className="container">
                    <h1 className="title">Dog Eat Dog World</h1>
                    <ButtonGroup className="buttonGroup">
                        <Button variant="primary" onClick={() => this.handleOnClick("customer")}>Customer</Button>
                        <Button variant="info" onClick={() => this.handleOnClick("vendor")}>Vendor</Button>
                        <Button variant="success" onClick={() => this.handleOnClick("admin")}>Admin</Button>
                            <Popup trigger={<button className="login"> Login</button>} position="left center">
                            <div className="logout">
                             {this.state.user ? (<LogOut />) : (<Login />)}
                             </div>
                            </Popup>
                    </ButtonGroup>
                    <ul className="headerMenu">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mapContainer">Map</NavLink></li>
                        {this.currentUserRoleName() === "Admin" && <li><NavLink to="/admin">Admin</NavLink></li>
                        }
                        {this.currentUserRoleName() === "Vendor" && <li><NavLink to="/vendor">Vendor</NavLink></li>
                        }
                    </ul>
                    <div className="contents">
                        <Route exact path="/" component={ Home }></Route>
                        <Route path="/menu" component={ Menu }></Route>
                        <Route path="/contact" component={ Contact }></Route>
                        <Route path="/mapContainer" component={ MapContainer }></Route>
                        <Route path="/admin" component={ Admin }></Route>
                        <Route path="/vendor" component={ Vendor }></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;
