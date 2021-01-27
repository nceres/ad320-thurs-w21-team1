import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

const mapStyles = {
    height: 400,
    width: 800
};

const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

class MapContainer extends React.Component {

    state = {
        activeMarker: {},
        selectedVendor: {},
        showingInfoWindow: false
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedVendor: props,
            showingInfoWindow: true
        });

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
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCa8VU2rMjvuJ4DIjjqOuQAkIepMfxZCDQ'
})(MapContainer);
