/*
* Module dependencies
*/
import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'

export default class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {

        let url = `/post/${this.props.data.id}`

        let img = this.props.data['AgregaunaImagen']
        let name = '';
        let data = this.props.data
        let id = this.props.data.id
        let description = '';
        switch (parseInt(this.props.tipo)) {
            case 0:
            name = FunctExtra.accentDecode(this.props.data['Nombredelaactividad'])
            description = FunctExtra.accentDecode(this.props.data['Descripcióndelaactividad'])
            break;
            case 1:
            name = FunctExtra.accentDecode(this.props.data['Título']);
            description = FunctExtra.accentDecode(this.props.data['Resumen']);
            break;
            case 2:
            name = FunctExtra.accentDecode(this.props.data['Nombres']);
            description = FunctExtra.accentDecode(this.props.data['Resumen']);
            break;
        }
        return (
            <div>
                <Link to={url}>
                    <figure>
                        <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                        <span>{name}</span>
                    </figure>
                </Link>
            </div>
        )
    }
}
