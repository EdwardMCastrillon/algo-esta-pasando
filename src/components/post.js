import React from 'react'
import utf from '../utils/accentDecode'


export default class Post extends React.Component {
    constructor (props) {
        super(props)
    }
    
    render () {
        let img = this.props.data['Agrega una Imagen']
        let name = utf.accentDecode(this.props.data['Nombre de la actividad']);
        let description = utf.accentDecode(this.props.data['Descripción de la actividad']);
        var divStyle = {
            background: this.props.data,
        };
        return (
            <figure  style={divStyle} >
                <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                <span>{name}</span>
            </figure>
        )
    }
}
// Post.propTypes = {
//     dataApi: React.PropTypes.object
// }
