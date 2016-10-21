import React, { Component, PropTypes } from 'react'
import {  Map, TileLayer, Marker, Popup  } from 'react-leaflet';


// markers:LocationMap.getLocations()
export default class CustomMap extends Component {
    constructor (props) {
        super(props)
        this.state = {
            lat: 7.2700951,
            lng: -75.5835595,
            zoom: 8.85
        }
    }
    componentDidMount(){
        document.querySelector(`#e${this.props.idEvent} .leaflet-container`).style.height = `300px`
        document.querySelector(`#e${this.props.idEvent} .leaflet-container`).style.width = `100%`
    }
    render () {
        const center = [this.props.position.lat, this.props.position.lng]
        var baseballIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
            iconSize: [32, 48],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        return (
            <Map center={center} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                <Marker position={center} icon={baseballIcon}></Marker>
            </Map>
        )
    }
}
