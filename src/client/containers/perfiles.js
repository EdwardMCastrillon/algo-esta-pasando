import React from 'react'
import { hashHistory } from 'react-router'

import Perfil from '../components/widgetPerfil'
import PerfilStore from '../providers/perfilStore'

export default class Perfiles extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            perfiles: PerfilStore.getPerfiles()
        })
    }

    componentWillUnmount() {
        PerfilStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        // if(document.querySelector(".showContent")){
        //     document.querySelector(".showContent").style.left = "100%";
        // }
        PerfilStore.init()
    }
    updateData() {
        this.setState({
            perfiles:PerfilStore.getPerfiles()
        })
    }
    componentDidMount(){
        PerfilStore.addChangeListener(this.updateData.bind(this))
    }

    render () {

        let divStyle = {
            height: window.innerHeight - 46
        }
        return (
            <div className="P-B-ContentPost Autores" style={divStyle}>
                <section className="P-B-Post flex justify-space-around wrap">
                    {
                        this.state.perfiles.map(item => {
                            return(
                                <Perfil key = { item.identificador } data={item} tipo="2"/>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}
