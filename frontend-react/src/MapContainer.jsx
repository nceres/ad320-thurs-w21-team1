import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Menu"

const mapStyles = {
    height: 400,
    width: 800
};

const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

class MapContainer extends React.Component {

    state = {
        activeMarker: {},
        selectedVendor: {},
        showingInfoWindow: false,
        showingModal: false
    };

    showModal = () => {
        this.setState({ showingModal: !this.state.showingModal })
    }


    onMarkerClick = (props, marker) => {
        console.log("you clicked on a marker :)");
        this.setState({
            activeMarker: marker,
            selectedVendor: props,
            showingInfoWindow: true,
            showingModal: true
        })

    };

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    render() {
        return (
            <div className="theMap">
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{lat: 47.444, lng: -122.176}}
                    resetBoundsOnResize={true}>
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'SOMA'}
                        position={{lat: 47.999, lng: -122.176}}/>

                    <Marker
                        onClick={this.onMarkerClick}
                        name={'This is a vendor!'}
                        position={{lat: 47.444, lng: -122.176}}
                        icon={image}/>


                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h4>Vendor Name: {this.state.selectedVendor.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>
                <button onClick={this.showModal}>Display Modal</button>
                <Modal show={this.state.showingModal}>
                    <Modal.Header>
                        <Modal.Title>This is going to be a menu!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Menu></Menu></Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.showModal}>Cancel</button>
                        <button onClick={this.showModal}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);
