import React from 'react'
import { Link } from 'react-router'
import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'
import PosContenido from './contenido'
import Edicion from '../constants/edicion'
import PerfilStore from '../providers/perfilStore'
import '../style/buscar.scss'

export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            itemNavTop: Aep.getAePs(),
            ediciones:Edicion.getEdiciones()
        })
    }
    componentWillUnmount() {
        Edicion.removeChangeListener(this.updateEdicion.bind(this))
    }
    componentWillMount(){
        Aep.init();
        Edicion.init();
        if(!this.state.background){
            let colorgrid = Edicion.getEdicion()
            if(colorgrid){
                colorgrid = colorgrid.coloraux;
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
    updateEdicion(){
        this.setState({
            ediciones: Edicion.getEdiciones()
        })
    }

    componentDidMount(){
        Aep.addChangeListener(this.updateData.bind(this))
        Edicion.addChangeListener(this.updateEdicion.bind(this))
    }
    render () {
        let urlAux = "aep"
        switch (this.props.route.location.pathname.split("/")[1]) {
            case "contenido":
            case "comentarios":
            case "centro_de_recursos":
            case "aep":
            case "agenda":
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
                        <Link to={url}>
                        <div className="item" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,item.Título)}></div>
                        </Link>

                    )
                })
            }
            </div>


            </div>
        )
    }
}
// <div className="filter flex  align-center ">
// <input type="text" placeholder="Escribe para buscar"/>
// </div>
// <div className="drawSearch" onClick={this.showFilters.bind(this)} style={this.state.background}>
// <i className="i-lupa"></i>
// </div>
