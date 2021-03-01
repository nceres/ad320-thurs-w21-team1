import React, {Component} from 'react';
import fire from '../src/config/Fire';
import Login from '../src/components/LoginRegister';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import {Button, ButtonGroup} from "react-bootstrap";
import Home from './Home';
import LogOut from './components/LogOut';
import Menu from './Menu';
import Contact from './Contact';
import MapContainer from './MapContainer';
import Admin from './Admin';

class Main extends React.Component {

<<<<<<< HEAD
    constructor(){
        super();
        this.state = {
          user: null
        }
      }
    
      componentDidMount(){
        this.authListener();
      }
    
      authListener(){
        fire.auth().onAuthStateChanged((user) => {
          if(user){
            this.setState({user});
          }else{
            this.setState({user:null});
          }
        });
      }
=======
    state = {
        selectedView: "customer"
    }

    handleOnClick = (viewClicked) => {
        this.setState({selectedView: viewClicked});
        //reload app to apply view
    }

    componentDidMount() {
        console.log(this.state.selectedView)
    }
>>>>>>> origin/main

    render() {
        return (
            <HashRouter>
                <div className="container">
<<<<<<< HEAD
                <div>
                {this.state.user ? (<LogOut />) : (<Login />)}
                </div>
                  <h1 className="title">Dog Eat Dog World</h1>
=======
                    <h1 className="title">Dog Eat Dog World</h1>
                    <ButtonGroup className="buttonGroup">
                        <Button variant="primary" onClick={() => this.handleOnClick("customer")}>Customer</Button>
                        <Button variant="info" onClick={() => this.handleOnClick("vendor")}>Vendor</Button>
                        <Button variant="success" onClick={() => this.handleOnClick("admin")}>Admin</Button>
                    </ButtonGroup>
>>>>>>> origin/main
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mapContainer">Map</NavLink></li>
                        {this.state.selectedView === "admin" && <li><NavLink to="/admin">Admin</NavLink></li>
                        }
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={ Home }></Route>
                        <Route path="/menu" component={ Menu }></Route>
                        <Route path="/contact" component={ Contact }></Route>
                        <Route path="/mapContainer" component={ MapContainer }></Route>
                        <Route path="/admin" component={ Admin }></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;
