import React from 'react'
import Edicion from '../constants/edicion'
import PerfilStore from '../providers/perfilStore'
import FunctExtra from '../utils/functExtra'
import request from 'superagent'

export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            filter1:Edicion.getEdicionfiltros("FILTRO_1"),
            filter2:Edicion.getEdicionfiltros("FILTRO_2"),
            filter3:Edicion.getEdicionfiltros("FILTRO_3"),
            autores: PerfilStore.getPerfiles()
        })
    }
    componentWillUnmount() {
        PerfilStore.removeChangeListener(this.updateAutor.bind(this))
        Edicion.removeChangeListener(this.updateEdicion.bind(this))
    }
    componentWillMount(){
        Edicion.init();
        PerfilStore.init();
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
    updateEdicion(){
        this.setState({
            filter: Edicion.getEdicionfiltros()
        })

    }
    updateAutor(){
        this.setState({
            autores: PerfilStore.getPerfiles()
        })
    }
    componentDidMount(){
        PerfilStore.addChangeListener(this.updateAutor.bind(this))
        Edicion.addChangeListener(this.updateEdicion.bind(this))
        // filter1
        // filter2
        // filter3
        if(this.state.filter1.length == 0){
            document.querySelector(".filter1").style.display = "none"
        }
        if(this.state.filter2.length == 0){
            document.querySelector(".filter2").style.display = "none"
        }
        if(this.state.filter3.length == 0){
            document.querySelector(".filter3").style.display = "none"
        }
    }
    showFilters(){
        self = this;
        let edicion = document.querySelector(".edicion").value;
        let autor = document.querySelector(".autor").value;
        let api = this.props.api;
        request
        .get(`/api/search?edicion=${edicion}&autor=${autor}&api=${api}`)
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (res.status === 404) {
                console.errr(err);
            } else {
                self.props.renderFilter(res.body,autor)
            }
        });
        return
    }
    render () {
        return (
            <div className="filterSelect flex align-center">

            <select className="filter1">
            <option value="0" >filtrar por:</option>
            {
                this.state.filter1.map(item => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })
            }
            </select>
            <select className="filter2">
            <option value="0" >filtrar por:</option>
            {
                this.state.filter2.map(item => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })
            }
            </select>
            <select className="filter3">
            <option value="0" >filtrar por:</option>
            {
                this.state.filter3.map(item => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })
            }
            </select>

            <select className="autor" onChange={this.showFilters.bind(this)}>
            <option value="0" >Autor</option>
            {
                this.state.autores.map(item => {
                    let name = FunctExtra.accentDecode(item['Nombres']+" "+item['Apellidos']);
                    return(
                        <option value={name}>{name}</option>
                    )
                })
            }
            </select>
            </div>

        )
    }
}
