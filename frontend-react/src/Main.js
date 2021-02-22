import React, {Component} from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Home from './Home';
import Menu from './Menu';
import Orders from './Orders';
import Contact from './Contact';
import MapContainer from './MapContainer';

class Main extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="container">
                    <h1 className="title">Simple Single Page App</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mapContainer">Map</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={ Home }></Route>
                        <Route path="/menu" component={ Menu }></Route>
                        <Route path="/orders" component={ Orders }></Route>
                        <Route path="/contact" component={ Contact }></Route>
                        <Route path="/mapContainer" component={ MapContainer }></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;
