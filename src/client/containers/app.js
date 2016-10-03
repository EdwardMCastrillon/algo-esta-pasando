/*
* Module dependencies
*/
import React from 'react'
import { hashHistory } from 'react-router'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'

// Estilos
import "../style/font.scss"
import "../style/Page.scss"
import "../style/Animate.scss"

export default class App extends React.Component {

    render () {
        return (
            <div className="Page">
                <Nav/>
                <div className="Page-body">
                    <div className="Page-body-top">
                        <Buscar/>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
