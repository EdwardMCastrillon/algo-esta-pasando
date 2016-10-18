/*
* Module dependencies
*/
import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
import Edicion from '../constants/edicion'

export default class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    componentWillMount(){
        if(!this.state.background){
            let colorgrid = Edicion.getEdicion()
            if(colorgrid[0]){
                colorgrid = colorgrid[0].coloritemgrid;
                console.log(colorgrid);
                this.setState({
                    background:{
                        'background':`r${colorgrid}`,
                    }
                })
                console.log(this.state.background);
            }
        }
    }
    render () {

        let url = `/${this.props.url}${this.props.data.id}`

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
                    <figure className="targetPost">
                        <img src={`https://tupale.co/milfs/images/secure/?file=600/${img}`}/>
                        <span style={this.state.background}>{name}</span>
                    </figure>
                </Link>
            </div>
        )
    }
}
