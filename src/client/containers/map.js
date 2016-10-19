import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet';

const MyPopupMarker = ({ children, position }) => (
    <Marker position={position}><Popup><span>{children}</span></Popup></Marker>
)
MyPopupMarker.propTypes = {
    children: MapPropTypes.children,
    position: MapPropTypes.latlng,
}

const MyMarkersList = ({ markers }) => {
    console.log(markers);
    const items = markers.map(({ key, props }) => (
        <MyPopupMarker key={key}>{props}</MyPopupMarker>
    ))
    return <div style={{display: 'none'}}>{items}</div>
}
MyMarkersList.propTypes = {
    markers: PropTypes.array.isRequired,
}

export default class CustomComponent extends Component {
    constructor () {
        super()
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        }
    }

    render () {
        const center = [this.state.lat, this.state.lng]

        const markers = [
            {key: 'marker1', position: {lat:51.5, lng:-0.1}, children: 'My first popup'},
            {key: 'marker2', position: {lat:51.51, lng:-0.1}, children: 'My second popup'},
            {key: 'marker3', position: {lat:51.49, lng:-0.05}, children: 'My third popup'},
        ]
        var baseballIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });

        return (
            <div className="P-B-ContentPost">
                <Map center={center} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    {
                        markers.map(item => {
                            return(
                                <Marker position={item.position} icon={baseballIcon}>
                                    <Popup>
                                        <div>
                                            {item.children}
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </Map>
            </div>
        )
    }
}
