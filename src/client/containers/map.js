import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet';
import LocationMap from '../providers/infoMapa'
import IconPerfil from '../img/perfil.png'
import IconEvent from '../img/wikicuidad.png'
import IconContebido from '../img/los_objetos.png'
import IconContebido from '../img/rayemos.png'



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
// markers:LocationMap.getLocations()
export default class CustomComponent extends Component {
    constructor () {
        super()
        this.state = {
            lat: 7.2700951,
            lng: -75.5835595,
            zoom: 8.85,
            markers:LocationMap.getLocations()
        }
    }
    componentWillUnmount() {
        LocationMap.removeChangeListener(this.updateData.bind(this))
    }

    updateData() {
        this.setState({
            markers:LocationMap.getLocations()
        })
    }
    componentDidMount(){
        LocationMap.addChangeListener(this.updateData.bind(this))
        // this.getData()
        document.querySelector(".leaflet-container").style.height = `${window.innerHeight - 50}px`
    }
    componentWillMount(){

        LocationMap.init()
    }
    render () {
        const center = [this.state.lat, this.state.lng]
        let icon;
        const IconP = L.icon({
            iconUrl: IconPerfil,
            iconSize: [32, 39],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        const IconE = L.icon({
            iconUrl: IconEvent,
            iconSize: [32, 39],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        const IconCont = L.icon({
            iconUrl: IconContebido,
            iconSize: [32, 39],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        var baseballIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        // Perfil
        // Agenda
        // Recurso
        // Contenido
        // Comentario
        return (
            <div className="P-B-ContentPost">
                <Map center={center} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    {
                        this.state.markers.map(item => {
                            switch (item.type) {
                                case "Perfil":
                                icon = IconP;
                                break;
                                case "Agenda":
                                icon = IconE;
                                break;
                                case "Contenido":
                                case "Comentario":
                                case "Recurso":
                                    icon = IconCont;
                                    break;
                                default:
                                icon = baseballIcon;
                            }

                            return(
                                <Marker position={item} icon={icon}>
                                    <Popup>
                                        <div>
                                            {item.type}
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


/*



*/
