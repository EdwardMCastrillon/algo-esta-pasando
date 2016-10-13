import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'

export default class Perfil extends React.Component {
    constructor (props) {
        super(props)

    }

    render () {

        let img = this.props.data['AgregaunaImagen'];
        let name = FunctExtra.accentDecode(this.props.data['Nombres']+" "+this.props.data['Apellidos']);
        let url = `/autores/${this.props.data.keyId}`

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
                    <span className="name">{name}</span>
                    <span></span>
                    <span className="descPer">{perfil}...</span>
                </Link>
                <div className="rS">
                    <a href={twitter}  target="_blank">
                        <i className="i-twitter"></i>
                    </a>
                    <i className="i-mail"></i>
                </div>
            </figure>

        )
    }
}
