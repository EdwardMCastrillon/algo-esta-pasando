/*
* Module dependencies
*/
import React from 'react'
// import Aep from '../providers/aep'
// Estilos
import "../style/loader.scss"


export default class Compartir extends React.Component {
    compartir(red,type,id){
        let url='';
        if(type == "agenda"){
            url = `/${id}`
        }
        switch (red) {
            case 1:
            	window.open(`https://twitter.com/?status=Me gusta esta página ${window.location.href}${url}?EdicionId=${localStorage.getItem("edicion")}`);
            break;
            case 2:
            	window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}${url}?EdicionId=${localStorage.getItem("edicion")}`);
            break;
        }
    }
    render () {
        console.log(this.props);
        return (
            <div className="sampleCompartir">
                <div className="contenRedes">
                    <i className="i-twitter" onClick={this.compartir.bind(this,1,this.props.type,this.props.id)}> </i>
                    <i className="i-facebook" onClick={this.compartir.bind(this,2,this.props.type,this.props.id)}> </i>
                </div>
            </div>
        )
    }
}
