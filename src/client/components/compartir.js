/*
* Module dependencies
*/
import React from 'react'
// import Aep from '../providers/aep'
// Estilos
import "../style/loader.scss"
import Edicion from '../constants/edicion'

export default class Compartir extends React.Component {
    compartir(red,type,id){
        let url='';
        let edicio = Edicion.getEdicion()
        let titulo = ''
        if(type == "agenda"){
            url = `/${id}`
            titulo = document.querySelector(".TituloAgendaT").innerHTML
        }else{
            titulo = document.querySelector("h1.Titulo").innerHTML
        }
        let HashTag = ''
        if(edicio.HashTag){
            HashTag = edicio.HashTag.replace("#","")
        }

        switch (red) {
            case 1:
            	window.open(`https://twitter.com/intent/tweet?url=${window.location.href}${url}?EdicionId=${localStorage.getItem("edicion")}&text=${titulo}&hashtags=${HashTag} `);
            break;
            case 2:
            	window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}${url}?EdicionId=${localStorage.getItem("edicion")}`);
            break;
        }
    }
    render () {

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
