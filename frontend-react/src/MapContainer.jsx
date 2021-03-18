import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import {Modal, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Menu"
import InfoWindowWrapper from "./InfoWindowWrapper"

const locationMarker = "http://maps.google.com/mapfiles/ms/icons/red.png";

class MapContainer extends React.Component {

    state = {
        activeMarker: {},
        selectedVendor: {},
        showingInfoWindow: false,
        showingModal: false,
        locations: []
    };

    showModal = () => {
        this.setState({showingModal: !this.state.showingModal})
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            selectedVendor: props,
            showingInfoWindow: true,
        })
    };


    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    componentDidMount() {
        fetch("/vendors")
            .then(res => res.json())
            .then(data => this.setState({locations: data}))
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.log(error),
            );
        } else {
            alert('Geolocation is not available')
        }
    };


    renderMarkers() {
        return this.state.locations.map((locations, i) => {
            return <Marker
                key={i}
                id={locations.location_id}
                position={{lat: locations.latitude, lng: locations.longitude}}
                name={locations.name}
                icon={{url: "/cart.png", scaledSize: new window.google.maps.Size(50, 50)}}
                onClick={this.onMarkerClick}
                animation={window.google.maps.Animation.DROP}
                draggable={true}
            />
        })
    };

    render() {
        return (
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "500px"
                }}>
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={10}
                    initialCenter={{lat: 47.62111, lng: -122.34930}}
                    resetBoundsOnResize={true}
                >

                    {this.renderMarkers()}

                    {<Marker

                        position={{lat: this.state.lat, lng: this.state.lng}}
                        icon={locationMarker}
                        title="You Are Here!"
                    />}

                    <InfoWindowWrapper
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h4>{this.state.selectedVendor.name}</h4>
                            <Button onClick={() => this.setState({
                                showingModal: true,
                                showingInfoWindow: false,
                                activeMarker: null
                            })}>
                                Place Order!
                            </Button>
                        </div>
                    </InfoWindowWrapper>
                </Map>
                <Modal show={this.state.showingModal} onHide={this.showModal}>
                    <Modal.Header>
                        <Modal.Title>You are viewing the menu for {this.state.selectedVendor.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Menu vendorId={this.state.selectedVendor.id}
                                      showModal={this.showModal}></Menu></Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.showModal}>Close Window</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);
