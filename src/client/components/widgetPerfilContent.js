import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
import RelacionAutor from '../providers/relacionAutor'
import Edicion from '../constants/edicion'
import Post from './posts'
import Map from './map'
import iconCompartir from '../img/compartir.svg'
import iconMapa from '../img/mapa.svg'
import PopupMapa from './map'

export default class WidgetPerfilContent extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            relacion:RelacionAutor.getRAutoresMax(5),
            namefilter1:Edicion.getNamefiltrosTags("FILTRO_1"),
            namefilter2:Edicion.getNamefiltrosTags("FILTRO_2"),
            namefilter3:Edicion.getNamefiltrosTags("FILTRO_3")
        }
    }
    componentDidMount(){
        RelacionAutor.init(this.props.autor.nombreCompleto)
        RelacionAutor.addChangeListener(this.updateData.bind(this))
        document.querySelector(".Descripcion").style.width = "calc(100% - 324px - 20px)"
    }
    componentDidUpdate(){

    }
    componentWillUnmount() {
        RelacionAutor.removeChangeListener(this.updateData.bind(this))
    }
    updateData() {
        console.log("updateData");
        this.setState({
            relacion:RelacionAutor.getRAutoresMax(5)
        })
    }
    compartir(){
        let url = `${window.location.href}?EdicionId=${localStorage.getItem("edicion")}`
        this.setState({ htmlCompartir: <HTMLCompartir url={url}></HTMLCompartir> })
    }
    closedPopup(){
        this.setState({
            popup: ''
        })
    }
    mapa(data){
        const PositionMap = ({ data, position }) => (
            <div className="popupConten open">
                <div className="popup-close-button" onClick={this.closedPopup.bind(this)}>×</div>
                <div className="popup-content-wrapper">
                    <div className="popup-content">
                        <Map position={position} idEvent={data.id}></Map>
                        <div className="popup-content-name">
                            {data.Lugardelevento}
                        </div>
                    </div>
                </div>
                <div className="popup-tip-container">
                    <div className="popup-tip"></div>
                    <div className="popup-tiptar"></div>
                </div>
            </div>
        );
        let position = {
            lat: data['Georreferencia(mapa)'].split(" ")[1],
            lng: data['Georreferencia(mapa)'].split(" ")[0]
        }
        this.setState({ popup: <PositionMap data={data} position={position}></PositionMap> })
    }
    render () {
        let img = this.props.autor['AgregaunaImagen'];
        var figure = {
            background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${img}) center center`,
            'backgroundSize': 'cover'
        };
        let iconComp = {
            background: `url(${iconCompartir}) center center`,
            'backgroundSize': 'cover'
        }
        let iconMap = {
            background: `url(${iconMapa}) center center`,
            'backgroundSize': 'cover'
        }
        let urlPerfil = `/autores/${this.props.autor.id}`
        let name = `${this.props.autor.Nombres} ${this.props.autor.Apellidos}`;
        let Linktwitter = '';
        let twitter = '';
        let tags = '';
        if(this.props.autor['CuentadeTwitter']){
            let t = this.props.autor['CuentadeTwitter'];
            twitter = (t)?t.replace("https://twitter.com/","@"):'';
            twitter = (t)?t.replace("@",""):'';
            Linktwitter = `https://twitter.com/${twitter}`
            twitter = `@${twitter}`
        }
        if(this.state.namefilter1){
            var  f = this.state.namefilter1.replace(/ /g,"");
            if(this.props.tags[f]){
                tags += this.props.tags[f]+',';
            }
        }

        if(this.state.namefilter1){
            var  f = this.state.namefilter2.replace(/ /g,"");
            if(this.props.tags[f]){
                tags += this.props.tags[f]+',';
            }
        }
        if(this.state.namefilter3){
            var  f = this.state.namefilter3.replace(/ /g,"");
            if(this.props.tags[f]){
                tags += this.props.tags[f];
            }
        }
        tags = tags.split(",")
        let fecha=''
        if(this.props.fecha){
            var month = [ "January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
            fecha = new Date(this.props.fecha*1000);
            fecha = `${month[fecha.getMonth()]} ${fecha.getDate()} ${fecha.getFullYear()}`
        }
        let countTags = 0
        return (
            <div className="wp">
                {this.state.popup}
                <div className="widgetPerfilCont flex">
                    <div className="figure" style={figure}></div>
                    <div className=" contentnameTwiter flex column  justify-center">
                        <span className="name">Por: {name}</span>
                        <a href={Linktwitter}  target="_blank">
                            {twitter}
                        </a>
                        <span className="fecha">{fecha}</span>
                    </div>
                    <Link className="linkTo" to={urlPerfil}>Ver Perfil</Link>
                </div>
                <div className="contentTags">
                    <span>Tags</span>

                    <div>
                        {
                            tags.map(item => {
                                ++countTags
                                let separar = ''
                                if(countTags < tags.length){
                                    separar = <span>, </span>
                                }
                                return(
                                    <span className="itemTags" onClick={this.props.changeFilter.bind(this,item)}>{item}{separar} </span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="contentCompart">
                    <div className="flex">
                        <span className="compartir" onClick={this.compartir.bind(this)} style={iconComp}></span>
                        <span className="mapaC" onClick={this.mapa.bind(this,this.props.tags)} style={iconMap}></span>
                    </div>
                    {this.state.htmlCompartir}
                </div>
                <div className="contentTags">
                    <span>Articulos relacionados</span>
                    <div onClick={this.props.loadContent()}>

                    </div>
                </div>
            </div>
        )
    }
}
const HTMLCompartir =({url}) =>(
    <div className="HTMLCompartir">
        <input value={url} dir="ltr"></input>
    </div>
)
// <span onClick={this.props.changeFilter.bind(this,'Identidad')}>Identidad</span>
/*

{
    this.state.relacion.map(item => {
        let url;
        switch (item.origen) {
            case 'Agenda':
            url="";
            break;
            case 'Recursos':
            url="centro_de_recursos/";
            break;
            case 'Contenidos':
            url="contenido/";
            break;
            case 'Comentarios':
            url="comentarios/";
            break;

        }
        return(
            <Post key={ item.identificador } data={ item } url={url} tipo={1} />
        )
    })
}
*/
