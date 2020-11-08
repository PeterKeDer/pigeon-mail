import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33
  //   },
  //   zoom: 11
  // };

  constructor(props) {
    super(props);
    let long, lati;
    navigator.geolocation.getCurrentPosition(function (position) {
      lati = position.coords.latitude;
      long = position.coords.longitude;
    });
    this.state = {
      center: {
        lat: lati,
        lng: long
      },
      zoom: 11
    };
  }

  componentDidMount() {
    let currentComponent = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      currentComponent.setState({
        center: center
      });
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '55vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCvWUDRBHu8E7URlY-xGu3NePrUt6j1GLg" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
          {/* <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;