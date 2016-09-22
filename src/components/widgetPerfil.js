import React from 'react'
import utf8 from 'utf8'

export default class Perfil extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
      var accentDecode = function (tx){
          var rp = String(tx)
          rp = rp.replace(/&aacute;/g, 'á')
          rp = rp.replace(/&eacute;/g, 'é')
          rp = rp.replace(/&iacute;/g, 'í')
          rp = rp.replace(/&oacute;/g, 'ó')
          rp = rp.replace(/&uacute;/g, 'ú')
          rp = rp.replace(/&ntilde;/g, 'ñ')
          rp = rp.replace(/&uuml;/g, 'ü')
          //
          rp = rp.replace(/&Aacute;/g, 'Á')
          rp = rp.replace(/&Eacute;/g, 'É')
          rp = rp.replace(/&Iacute;/g, 'Í')
          rp = rp.replace(/&Oacute;/g, 'Ó')
          rp = rp.replace(/&Uacute;/g, 'Ú')
          rp = rp.replace(/&Ñtilde;/g, 'Ñ')
          rp = rp.replace(/&Üuml;/g, 'Ü')
        return rp
      }
        let img = this.props.data['Agrega una Imagen'];
        let name = (this.props.data['Nombres']);
        let description = this.props.data['Resumen'];

        let perfil = accentDecode(this.props.data['Perfil'].substring(0,60));
        let t = this.props.data['Cuenta de Twitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        console.log(perfil)
        var divStyle = {
            background: `url(https://tupale.co/milfs/images/secure/?file=600/${img}) center center`,
            'background-size': 'cover'
        };
        return (
            <figure  className="perfil">
                <div style={divStyle}> </div>
                <span >{name}</span>
                <span>{twitter}</span>
                <span>{perfil}...</span>
            </figure>
        )
    }
}
