import React, { Component } from 'react';
import L from 'leaflet';
import LocationMap from '../providers/infoMapa'
import IconPerfil from '../img/perfil.png'
import IconEvent from '../img/wikicuidad.png'
import IconContebido from '../img/los_objetos.png'

let config = {};

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
const baseballIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
config.params = {
    center: [6.247046187661623,-75.47744750976564],
    zoom: 10,
    zoomControl: false,
    legends: true,
    infoControl: false,
    attributionControl: true
};
config.tileLayer = {
    uri: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    params: {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        id: '',
        accessToken: ''
    }
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            tileLayer: null,
            geojsonLayer: null,
            geojson: null,
            numEntrances: null,
            markers:LocationMap.getLocations()
        };
        //
        this._mapNode = null;
    }
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }
    componentDidMount() {
        console.log("this.state.markers  ",this.state.markers);
        if (!this.state.map){
            console.log("entra");
            this.setState({
                idmap:this._mapNode
            })
            LocationMap.addChangeListener(this.updateData.bind(this))
        }
    }
    componentWillMount(){
        LocationMap.init()
        if(this.state.markers.length > 0){
            this.updateData();
        }
        //if(this.state.markers){this.updateData()}
        // this.setState({
        //     map: null,
        //     tileLayer: null,
        //     geojsonLayer: null,
        //     geojson: null,
        //     numEntrances: null
        // });
        // // markers:LocationMap.getLocations()
        // this._mapNode = null;
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
        this.state.map.remove();
        LocationMap.removeChangeListener(this.updateData.bind(this))

    }

    updateData() {
        console.log("update");
        const id = this.state.idmap
        if (this.state.map) return;
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
        this.setState({
            markers:LocationMap.getLocations()
        })
        let icon;
        let m = []
        this.state.markers.map(item => {
            let min = 1,max =  new Date().getTime();
            let key = Math.random() * (max - min) + min;
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
            let img = `https://tupale.co/milfs/images/secure/?file=300/${item.image}`
            var background = {
                background: `rgb(234, 234, 234) url(${img}) top center`,
                'backgroundSize': 'cover'
            };
            m.push(L.marker([item.lat, item.lng],{icon:icon}).bindPopup(`<div><div class ="img" style="background: rgb(234, 234, 234) url(${img}) top center"></div><div class="content"><div class="c_name">${item.name}</div><div class="c_resumen">${item.text}</div></div><div/>`))
        })
        L.layerGroup(m).addTo(map);;

        // set our state to include the tile layer
        this.setState({ map, tileLayer });
        document.querySelector(".leaflet-container").style.height = `${window.innerHeight - 50}px`

        // map.on("click", function (event) {
        //     console.log(event);
        // });
    }

    render() {
        return (
            <div id="mapUI" className="P-B-ContentPost">

            <div ref={(node) => this._mapNode = node} id="map" />

            </div>
        );
    }
}

export default Map;
