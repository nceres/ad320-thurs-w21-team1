import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Menu"

const mapStyles = {
    position: 'absolute',
    width: 800,
    height: 400
};

const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
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

    componentDidMount() {
        fetch("/vendors")
            .then(res => res.json())
            .then(data => this.setState({locations: data}))
    };

    componentWillMount(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.log(err),
    
        );
      } else {
        alert('No location available')
      }
    }

    renderMarkers() {
        return this.state.locations.map((locations, i) => {
            return <Marker
                key={i}
                id={locations.location_id}
                position={{lat: locations.latitude, lng: locations.longitude}}
                name={locations.name}
                icon={image}
                onClick={this.onMarkerClick}/>

                

                 
        })
        
    };



    

    render() {

        const { p } = this.props;
    const { lat, lng } = this.state;
        

        return (
            <div className="theMap">
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{lat: 47.62111, lng: -122.34930}}
                    resetBoundsOnResize={true}
                >
                

                    {this.renderMarkers()}

                    {<Marker
                    
                    position={{lat:this.state.lat, lng:this.state.lng }}
                    icon={locationMarker}
                    title="You Are Here!"
                
                    
        
        />}
        

            

                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h4>{this.state.selectedVendor.name}</h4>
                        </div>

                        
                    </InfoWindow>

                
                    
                </Map>

                <button onClick={this.showModal} onHide={this.showModal}>Display Modal</button>

                <Modal show={this.state.showingModal}>
                    <Modal.Header>
                        <Modal.Title>Today's Menu of {this.state.selectedVendor.name} Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Menu vendorId={this.state.selectedVendor.id}></Menu></Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.showModal}>Done</button>
                    </Modal.Footer>
                </Modal>
                
      <p> Your location on the map</p>
                
            </div>

            
            
            
        );        
        
        
    }

    
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyDKOdHaLhe85VCQ7H7i7hCGi0LdU5g74Ww'
})(MapContainer);