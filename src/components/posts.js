import React from 'react'
import InfiniteGrid from '../grid/grid';

export default class Post extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        let img = this.props.data['Agrega una Imagen']
        let name = ''
        switch (parseInt(this.props.tipo)) {
            case 0:
            name = this.props.data['Nombre de la actividad'];
            break;
            case 1:
            name = this.props.data['Título'];
            break;
        }

        let description = this.props.data['Descripción de la actividad'];
        var divStyle = {
            background: this.props.data,
        };
        return (
            <figure  style={divStyle}>
                <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                <span>{name}</span>
            </figure>
        )
    }
}
