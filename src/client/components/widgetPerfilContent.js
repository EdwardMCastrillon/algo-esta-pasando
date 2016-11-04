import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
import RelacionAutor from '../providers/relacionAutor'
import Edicion from '../constants/edicion'
import Post from './posts'

export default class WidgetPerfilContent extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            relacion:RelacionAutor.getRAutoresMax(5),
            namefilter1:Edicion.getNamefiltros("FILTRO_1"),
            namefilter2:Edicion.getNamefiltros("FILTRO_2"),
            namefilter3:Edicion.getNamefiltros("FILTRO_3")
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        RelacionAutor.init(`${this.props.autor.Nombres} ${this.props.autor.Apellidos}`)
        RelacionAutor.addChangeListener(this.updateData.bind(this))
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
    render () {
        let img = this.props.autor['AgregaunaImagen'];
        var figure = {
            background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${img}) center center`,
            'backgroundSize': 'cover'
        };
        let urlPerfil = `/autores/${this.props.autor.id}`
        let name = `${this.props.autor.Nombres} ${this.props.autor.Apellidos}`;
        let Linktwitter = '';
        let twitter = '';
        if(this.props.autor['CuentadeTwitter']){
            let t = this.props.autor['CuentadeTwitter'];
            twitter = (t)?t.replace("https://twitter.com/","@"):'';
            twitter = (t)?t.replace("@",""):'';

            Linktwitter = `https://twitter.com/${twitter}`
        }
        let fecha=''
        if(this.props.fecha){
            var month = [ "January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
            fecha = new Date(this.props.fecha*1000);
            fecha = `${month[fecha.getMonth()]} ${fecha.getDate()} ${fecha.getFullYear()}`
        }

        return (
            <div>
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
            <div>
            {this.props.tags}
            ,{this.state.namefilter1}
            ,{this.state.namefilter2}
            ,{this.state.namefilter3}
            </div>
            </div>
            <div className="contentTags">
            <span>Articulos relacionados</span>
            <div>
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
