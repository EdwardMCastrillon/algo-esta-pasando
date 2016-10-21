import React from 'react'
import { Link } from 'react-router'
import Edicion from '../constants/edicion'
import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'
import PosContenido from './contenido'

export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            itemNavTop: Aep.getAePs()
        })
    }
    componentWillMount(){
        Aep.init()
        if(!this.state.background){
            let colorgrid = Edicion.getEdicion()
            if(colorgrid){
                colorgrid = colorgrid.coloritemgrid;
                this.setState({
                    background:{
                        'background':`${colorgrid}`,
                    }
                })
            }
        }
    }
    updateData() {
        this.setState({
            itemNavTop: Aep.getAePs()
        })
    }
    componentDidMount(){
        Aep.addChangeListener(this.updateData.bind(this))
    }
    render () {
        let urlAux = "aep"
        switch (this.props.route.location.pathname.split("/")[1]) {
            case "contenido":
            case "comentarios":
            case "centro_de_recursos":
            case "aep":
            urlAux = "aep_"
            break;
            case "aep_":
            urlAux = "aep"
            break;
        }
        return (
            <div>
                <div id="NavBarTop" className="flex  align-center justify-center">
                    {
                        this.state.itemNavTop.map(item => {
                            let url = `/${urlAux}/${item.id}`
                            return(
                                <Link to={url} onClick={this.prueba.bind(this)}>
                                    <div className="item" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,item.Título)}></div>
                                </Link>

                            )
                        })
                    }
                </div>
                <div className="drawSearch" style={this.state.background}>
                    <i className="i-lupa_icon"></i>
                </div>
            </div>
        )
    }
}
