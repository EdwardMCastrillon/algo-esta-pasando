/*
* Module dependencies
*/
import React from 'react'
import Edicion from '../constants/edicion'
import FunctExtra from '../utils/functExtra'


export default class Footer extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            edicion:Edicion.getEdicion()
        })
    }
    render () {
        return (
            <div className="Page-body-footer flex justify-center align-center">
                <div className="copyright flex" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.edicion.textCopyLeft)}></div>
                <div className="info">{this.state.edicion.Info_de_contacto}</div>
            </div>
        )
    }
}
