import React, { Component } from 'react';
import L from 'leaflet';
import LocationMap from '../providers/infoMapa'
import { Link } from 'react-router'
import IconPerfil from '../img/mapa_autor.png'
import IconEvent from '../img/mapa_agenda.png'
import IconContebido from '../img/mapa_contenidos.png'
import IconRecursi from '../img/mapa_recursos.png'
import IconEditorial from '../img/mapa_editorial.png'
import request from 'superagent'
import apiEndpoints from '../utils/apiEndpoints'
import Post from '../components/posts'
import FunctExtra from '../utils/functExtra'
import PerfilStore from '../providers/perfilStore'
import Edicion from '../constants/edicion'
import CompartirRedes from '../components/compartir'

const server = '/api'
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
const IconEdito = L.icon({
    iconUrl: IconEditorial,
    iconSize: [32, 39],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
const IconRecur = L.icon({
    iconUrl: IconRecursi,
    iconSize: [32, 39],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
const baseballIcon = L.icon({
    iconUrl: IconContebido,
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
    uri: 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
    params: {
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        id: '',
        accessToken: ''
    }
};

// params: {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//     id: '',
//     accessToken: ''
// }
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            tileLayer: null,
            geojsonLayer: null,
            geojson: null,
            numEntrances: null,
            markers:LocationMap.getLocations(),
            postUltimos:[]
        };
        //
        this._mapNode = null;
    }
    componentDidUpdate(){

    }
    updateData(){
        this.setState({
            markers:LocationMap.getLocations()
        })
        this.init(this._mapNode)
    }
    componentDidMount() {

        // create the Leaflet map object
        if (!this.state.map){

            this.setState({
                idmap:this._mapNode
            })
            LocationMap.addChangeListener(this.updateData.bind(this))
        }
        if(this.state.markers.length > 0){

            this.updateData()
        }
        FunctExtra.showFilters()
        this.ocultar()
        let self = this
        window.addEventListener('resize', function(event){
            self.ocultar()
        });
    }
    componentWillMount(){
        LocationMap.init()
        this.ultimosPosts()

    }
    ocultar(){
        if(document.body.clientWidth < 750){
            document.querySelector(".c_AutorRelations").style.display = "none"
            document.querySelector("#map").style.width = `${document.body.clientWidth}px`
        }else{
            document.querySelector(".c_AutorRelations").style.display = "block"
            document.querySelector("#map").style.width = "calc(100% - 300px);"
        }
    }
    ultimosPosts(){
        const self = this;
        request
        .get(`${server}${apiEndpoints.ultimosPosts}`)
        .query({ edicion: localStorage.getItem("nameEdicion")})
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (res.status === 404) {
                cb(new Error('not found'))
            } else {
                self.setState({
                    postUltimos:res.body
                })
            }
        });
    }
    componentWillUnmount() {
        this.state.map.remove();
    }

    init(id) {

        if (this.state.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let edicionAct = Edicion.getEdicion()
        let map = L.map(id, config.params);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        if(edicionAct.tileLayer){
            config.tileLayer.uri = edicionAct.tileLayer;
        }
        if(edicionAct.tileLayerParams){
            config.tileLayer.params = edicionAct.tileLayerParams;
        }

        const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

        // set our state to include the tile layer

        L.layerGroup(this.getData()).addTo(map);

        map.panTo(new L.LatLng(this.state.markers[0].lat,this.state.markers[0].lng));

        this.setState({ map, tileLayer });
        document.querySelector(".leaflet-container").style.height = `${window.innerHeight - 50}px`


    }
    getData(){
        let icon;
        let m = []
        this.state.markers.map(item => {
            let min = 1,max =  new Date().getTime();
            let key = Math.random() * (max - min) + min;
            let url = ''
            switch (item.type) {
                case "Perfil":
                icon = IconP;
                url = `/autores/${item.id}`
                break;
                case "Agenda":
                icon = IconE;
                url = `/agenda/${item.id}`
                break;
                case "Editorial":
                icon = IconEdito;
                // url = `/${this.props.url}${item.id}`
                break
                case "Contenido":
                icon = IconCont;
                url = `/contenido/${item.id}`
                break;
                case "Comentario":
                icon = IconCont;
                break
                case "Recurso":
                icon = IconRecur;
                url = `/centro_de_recursos/${item.id}`
                break;
                default:
                icon = baseballIcon;
            }
            url = `${url}`


            let img = `https://tupale.co/milfs/images/secure/?file=300/${item.image}`
            var background = {
                background: `rgb(234, 234, 234) url(${img}) center center`,
                'backgroundSize': 'cover'
            };
            let htmlAutor = ''
            if(item.autor && item.type != "Perfil" && item.type != "Editorial"){
                let autor = PerfilStore.getPerfilName(item.autor)


                let twitter = '';
                let Linktwitter = '';
                if(autor['CuentadeTwitter']){
                    let t = autor['CuentadeTwitter'];
                    twitter = (t)?t.replace("https://twitter.com/","@"):'';
                    twitter = (t)?t.replace("@",""):'';
                    Linktwitter = `https://twitter.com/${twitter}`
                    twitter = `@${twitter}`
                }
                let fecha=''
                // if(autor.fecha){
                //     var month = [ "January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
                //     fecha = new Date(this.props.fecha*1000);
                //     fecha = `${month[fecha.getMonth()]} ${fecha.getDate()} ${fecha.getFullYear()}`
                // }
                var figure = {
                    background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${autor['AgregaunaImagen']}) center center`,
                    'backgroundSize': 'cover'
                };


                htmlAutor = `<div class="escritorAutor widgetPerfilCont flex"> <div class="figure" style="background-size:cover;background: rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${autor['AgregaunaImagen']}) center center"></div> <div class=" contentnameTwiter flex column  justify-center"> <span class="name">Por: ${autor['nombreCompleto']}</span> <a href="${Linktwitter}"  target="_blank"> ${twitter} </a> <span class="fecha">${fecha}</span> </div> </div>`
            }
            let textDesc = item.text
            if(item.text.length > 150){
                textDesc = item.text.substring(0, 150)
            }
            let cr = <CompartirRedes></CompartirRedes>
            m.push(L.marker([item.lat, item.lng],{icon:icon}).bindPopup(`<div> <a href="${url}"> <div class ="img" style="background: rgb(234, 234, 234) url(${img}) center center"> </div> <div class="content"> <div class="c_name">${item.name} </div> <div class="c_resumen">${textDesc}...</div> </div></a>${htmlAutor}</div>`))
        })

        return m;
    }
    render() {
        return (
            <div id="mapUI" className="P-B-ContentPost flex">

                <div ref={(node) => this._mapNode = node} id="map" />
                <div className="c_AutorRelations">
                    <span className="title">Contenidos recientes</span>
                    {
                        this.state.postUltimos.map(item => {
                            return(
                                <Post key={ item.identificador } data={item}  url="contenido/" tipo="1"/>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}

export default Map;
