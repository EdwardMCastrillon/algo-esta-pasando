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
        RelacionAutor.init(`${this.props.autor.Nombres} ${this.props.autor.Apellidos}`)
        RelacionAutor.addChangeListener(this.updateData.bind(this))
        document.querySelector(".Descripcion").style.width = "calc(100% - 324px - 20px)"
    }
    componentWillUnmount() {
        RelacionAutor.removeChangeListener(this.updateData.bind(this))
    }
    updateData() {

        this.setState({
            relacion:RelacionAutor.getRAutoresMax(5)
        })
    }
    compartir(){
        this.setState({ htmlCompartir: <HTMLCompartir url={window.location.href}></HTMLCompartir> })
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
        }

        if((this.props.tags[this.state.namefilter1])){
            tags += (this.props.tags[this.state.namefilter1])+',';
        }
        if((this.props.tags[this.state.namefilter2])){
            tags += (this.props.tags[this.state.namefilter2])+',';
        }
        if((this.props.tags[this.state.namefilter3])){
            tags += (this.props.tags[this.state.namefilter3]);
        }
        tags = tags.split(",")
        let fecha=''
        if(this.props.fecha){
            var month = [ "January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
            fecha = new Date(this.props.fecha*1000);
            fecha = `${month[fecha.getMonth()]} ${fecha.getDate()} ${fecha.getFullYear()}`
        }

        return (
            <div className="wp">
                {this.state.popup}
                <div className="widgetPerfilCont flex">
                    <div className="figure" style={figure}></div>
                    <div className=" contentnameTwiter flex column  justify-center">
                        <span className="name">Por: {name}</span>
                        <a href={Linktwitter}  target="_blank">
                            @{twitter}
                        </a>
                        <span className="fecha">{fecha}</span>
                    </div>
                    <Link className="linkTo" to={urlPerfil}>Ver Perfil</Link>
                </div>
                <div className="contentTags">
                    <span>Tags</span>
                    <span onClick={this.props.changeFilter.bind(this,'Identidad')}>Identidad</span>
                    <div>
                        {
                            tags.map(item => {
                                return(
                                    <span onClick={this.props.changeFilter.bind(this,item)}>{item}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="contentCompart ">
                    <div className="flex">
                        <span className="compartir" onClick={this.compartir.bind(this)} style={iconComp}></span>
                        <span className="mapaC" onClick={this.mapa.bind(this,this.props.tags)} style={iconMap}></span>
                    </div>
                    {this.state.htmlCompartir}
                </div>
                <div className="contentTags">
                    <span>Articulos relacionados</span>
                    <div onClick={this.props.loadContent()}>
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
