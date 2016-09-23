import React from 'react'
import utf from '../utils/accentDecode'
import { Link } from 'react-router'

export default class Post extends React.Component {
    constructor (props) {
        super(props)
    }
    openPost(){
        console.log("openPost")
    }
    render () {
        let url = `/${this.props.data['identificador']}`
        let img = this.props.data['Agrega una Imagen']
        let name = '';
        let description = '';
        switch (parseInt(this.props.tipo)) {
            case 0:
            name = utf.accentDecode(this.props.data['Nombre de la actividad'])
            description = utf.accentDecode(this.props.data['Descripción de la actividad'])
            break;
            case 1:
            name = utf.accentDecode(this.props.data['Título']);
            description = utf.accentDecode(this.props.data['Resumen']);
            break;
            case 2:
            name = utf.accentDecode(this.props.data['Nombres']);
            description = utf.accentDecode(this.props.data['Resumen']);
            break;
        }


        // var divStyle = {
        //     background: this.props.data,
        // };onClick={this.openPost.bind(this)}
        return (
            <div>
                <Link to={url}>
                    <figure >
                        <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                        <span>{name}</span>
                    </figure>
                </Link>
            </div>
        )
    }
}
