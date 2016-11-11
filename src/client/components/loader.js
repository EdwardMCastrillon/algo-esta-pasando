/*
* Module dependencies
*/
import React from 'react'
// import Aep from '../providers/aep'
// Estilos
import "../style/loader.scss"


export default class Loader extends React.Component {
    render () {
        return (
            <div className="sampleContainer">
                <div className="loader">
                    <span className="dot dot_1"></span>
                    <span className="dot dot_2"></span>
                    <span className="dot dot_3"></span>
                    <span className="dot dot_4"></span>
                </div>
            </div>
        )
    }
}
