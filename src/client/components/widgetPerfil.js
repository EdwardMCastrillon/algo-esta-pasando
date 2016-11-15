import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
import Edicion from '../constants/edicion'

export default class WPerfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            font_grid_titulos:{
                "font-family":Edicion.getEdicion().font_grid_titulos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_grid_resumen:{
                "font-family":Edicion.getEdicion().font_grid_resumen.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_titulos:{
                "font-family":Edicion.getEdicion().font_titulos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_parrafos:{
                "font-family":Edicion.getEdicion().font_parrafos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            }
        }
    }

    render () {

        let img = this.props.data['AgregaunaImagen'];
        let name = FunctExtra.accentDecode(this.props.data['Nombres']+" "+this.props.data['Apellidos']);
        let url = `/autores/${this.props.data.id}`

        let description = this.props.data['Resumen'];
        let perfil = FunctExtra.accentDecode(this.props.data['Perfil'].substring(0,60));

        let t = this.props.data['CuentadeTwitter'];

        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        twitter = (t)?t.replace("@",""):'';

        twitter = `https://twitter.com/${twitter}`


        var divStyle = {
            background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${img}) center center`,
            'backgroundSize': 'cover'
        };
        return (

            <figure className="perfil">
                <Link to={url}>
                    <div className="pfot" style={divStyle}> </div>
                    <span className="name" style={this.state.font_titulos}>{name}</span>
                    <span></span>
                    <span className="descPer" style={this.state.font_grid_resumen}>{perfil}...</span>
                </Link>
                <div className="rS">
                    <a href={twitter}  target="_blank">
                        <i className="i-twitter"></i>
                    </a>
                </div>
            </figure>

        )
    }
}
