import React from 'react'
import Edicion from '../constants/edicion'
import PerfilStore from '../providers/perfilStore'
import FunctExtra from '../utils/functExtra'
import request from 'superagent'

export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            ediciones:Edicion.getEdiciones(),
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
            ediciones: Edicion.getEdiciones()
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

            <select className="edicion">
            {
                this.state.ediciones.map(item => {
                    let Título = FunctExtra.accentDecode(item['Título']);
                    let select = '';
                    if(localStorage.getItem("nameEdicion") == Título){
                        select = 'selected'
                    }
                    return(
                        <option value={Título}>{Título}</option>
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
