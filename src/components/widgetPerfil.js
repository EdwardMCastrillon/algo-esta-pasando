import React from 'react'

export default class Perfil extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        let img = this.props.data['Agrega una Imagen'];
        let name = this.props.data['Nombres'];
        let description = this.props.data['Resumen'];
        let perfil = this.props.data['Perfil'].substring(0,60);
        let t = this.props.data['Cuenta de Twitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        var divStyle = {
            background: `url(https://tupale.co/milfs/images/secure/?file=600/${img}) center center`
        };
        return (
            <figure  className="perfil">
                <div style={divStyle}> </div>
                <span>{name}</span>
                <span>{twitter}</span>
                <span>{perfil}...</span>
            </figure>
        )
    }
}
