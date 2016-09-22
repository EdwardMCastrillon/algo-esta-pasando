import React from 'react'
import utf from '../utils/accentDecode'


export default class Post extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
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
        // };
        return (
            <figure>
                <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                <span>{name}</span>
            </figure>
        )
    }
}
