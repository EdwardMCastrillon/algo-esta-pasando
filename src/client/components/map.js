import React, { Component, PropTypes } from 'react'
import {  Map, TileLayer, Marker, Popup  } from 'react-leaflet';
import Ubicacion_mapa from '../img/ubicacion_mapa.png'

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
        if(document.querySelector(`#e${this.props.idEvent} .leaflet-container`)){
            document.querySelector(`#e${this.props.idEvent} .leaflet-container`).style.height = `300px`
            document.querySelector(`#e${this.props.idEvent} .leaflet-container`).style.width = `100%`
        }
    }
    render () {
        const center = [this.props.position.lat, this.props.position.lng]
        const IconCont = L.icon({
            iconUrl: Ubicacion_mapa,
            iconSize: [32, 39],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        return (
            <Map center={center} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                <Marker position={center} icon={IconCont}></Marker>
            </Map>
        )
    }
}
