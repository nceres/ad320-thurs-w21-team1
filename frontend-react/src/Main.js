import React, {Component} from 'react';
import fire from '../src/config/Fire';
import Login from '../src/components/LoginRegister';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Home from './Home';
import LogOut from './components/LogOut';
import Menu from './Menu';
import Contact from './Contact';
import MapContainer from './MapContainer';
import Admin from './Admin';

class Main extends React.Component {

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

    render() {
        return (
            <HashRouter>
                <div className="container">
                <div>
                {this.state.user ? (<LogOut />) : (<Login />)}
                </div>
                  <h1 className="title">Dog Eat Dog World</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mapContainer">Map</NavLink></li>
                        <li><NavLink to="/admin">Admin</NavLink></li>
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
