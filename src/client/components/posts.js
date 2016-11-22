/*
* Module dependencies
*/
import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
import Edicion from '../constants/edicion'


export default class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            font_grid_titulos:{
                "font-family":Edicion.getEdicion().font_grid_titulos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_grid_resumen:{
                "font-family":Edicion.getEdicion().font_grid_resumen.replace(/&quot;/g, '').replace(";","").split(":")[1]
            }
        }
    }
    componentWillMount(){
        if(!this.state.background){
            let colorgrid = Edicion.getEdicion()
            if(colorgrid){
                colorgrid = colorgrid.coloritemgrid;
                this.setState({
                    background:{
                        'background':`${colorgrid}`,
                    }
                })
            }
        }
    }
    closeSearch(){
        if(document.querySelector(".contentSearch")){
            document.querySelector(".contentSearch").classList.add('active');
        }
    }
    render () {

        let url = `/${this.props.url}${this.props.data.id}`
        let resumen = ''
        let img = '';
        if(this.props.data['AgregaunaImagen']){
            img = this.props.data['AgregaunaImagen']
        }
        let name = '';
        let data = this.props.data


        let id = this.props.data.id
        let description = '';
        if(this.props.search){
            switch (data.origen) {
                case "Perfiles":
                url = `/autores/${this.props.data.id}`
                break;
                case "Agenda":
                url = `/agenda/${this.props.data.id}`
                break;
                case "Recursos":
                url = `/centro_de_recursos/${this.props.data.id}`
                break;
                case "Contenido":
                url = `/contenido/${this.props.data.id}`
                break;
                case "Comentarios":
                url = `/comentarios/${this.props.data.id}`
                break;
                case "Bitacoras":
                url = `/contenido/${this.props.data.id}`
                break;
                case "Manifiesto":
                url = `/${this.props.url}${this.props.data.id}`
                break;
                case "Ediciones":
                url = `/${this.props.url}${this.props.data.id}`
                break;
                case "Editorial":
                url = `/${this.props.url}${this.props.data.id}`
                break;
            }
            url = `${url}`
        }
        switch (parseInt(this.props.tipo)) {
            case 0:
            name = FunctExtra.accentDecode(this.props.data['Nombredelaactividad'])
            description = FunctExtra.accentDecode(this.props.data['Descripcióndelaactividad'])
            break;
            case 1:
            name = FunctExtra.accentDecode(this.props.data['Título']);
            description = FunctExtra.accentDecode(this.props.data['Resumen']);
            if(this.props.data.Resumen){
                resumen = `${this.props.data['Resumen'].substring(0, 150)}...`;
            }
            break;
            case 2:
            name = FunctExtra.accentDecode(this.props.data['Nombres']);
            description = FunctExtra.accentDecode(this.props.data['Resumen']);
            break;
        }
        let figure = ''
        let classFigure = "targetPost noInmg"
        let back = this.state.background;
        if(img != ''){
            classFigure = "targetPost"
            back = {}
            figure = <Imgfigure background={`https://tupale.co/milfs/images/secure/?file=600/${img}`} />
        }
        return (
            <div>
                <Link to={url} onClick={this.closeSearch.bind(this)}>
                    <figure className={classFigure} style={back}>
                        {figure}
                        <div style={this.state.background} className="tP_description">
                            <i className="plus i-plus"></i>
                            <span className="titulo" style={this.state.font_grid_titulos}>{name}</span>
                            <span className="description" style={this.state.font_grid_resumen}>{resumen}</span>
                        </div>
                    </figure>
                </Link>
            </div>
        )
    }
}
const Imgfigure = ({ background }) => (
    <img src={background}/>
);
