import React from 'react'
import { Link } from 'react-router'
import Edicion from '../constants/edicion'
import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'

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

        return (
            <div>
                <div id="NavBarTop" className="flex  align-center justify-center">
                    {
                        this.state.itemNavTop.map(item => {
                            return(

                                <Link to="#">
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
