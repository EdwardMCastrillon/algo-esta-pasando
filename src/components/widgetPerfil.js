import React from 'react'
import utf from '../utils/accentDecode'

export default class Perfil extends React.Component {
    constructor (props) {
        super(props)

    }

    render () {

        let img = this.props.data['Agrega una Imagen'];
        let name = (this.props.data['Nombres']);

        let description = this.props.data['Resumen'];
        let perfil = utf.accentDecode(this.props.data['Perfil'].substring(0,60));
        let t = this.props.data['Cuenta de Twitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        var divStyle = {
            background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=600/${img}) center center`,
            'backgroundSize': 'cover'
        };
        return (
            <figure  className="perfil">
                <div style={divStyle}> </div>
                <span>{name}</span>
                <span></span>
                <span>{perfil}...</span>
            </figure>
        )
    }
}
