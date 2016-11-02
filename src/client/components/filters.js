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
            document.querySelector(".FILTRO_1").style.display = "none"
        }
        if(this.state.filter2.length == 0){
            document.querySelector(".FILTRO_2").style.display = "none"
        }
        if(this.state.filter3.length == 0){
            document.querySelector(".FILTRO_3").style.display = "none"
        }
    }
    showFilters(){
        self = this;
        let FILTRO_1 = ''
        let FILTRO_2 = ''
        let FILTRO_3 = ''
        let keyF1 = '',keyF2 = '',keyF3 = '';
        if(this.state.filter1.length > 0){
            console.log("entra");
            keyF1 = Edicion.getObjectkeys("FILTRO_1")
            FILTRO_1 = document.querySelector(".FILTRO_1").value
        }
        if(this.state.filter2.length > 0){
            console.log("entra");
            keyF2 = Edicion.getObjectkeys("FILTRO_1")
            FILTRO_2 = document.querySelector(".FILTRO_2").value
        }
        if(this.state.filter3.length > 0){
            console.log("entra");
            keyF3 = Edicion.getObjectkeys("FILTRO_1")
            FILTRO_3 = document.querySelector(".FILTRO_3").value
        }

        let getData = {
            "filtro1": {
                "name": keyF1,
                "value": FILTRO_1
            },
            "filtro2": {"name": keyF2, "value": FILTRO_2},
            "filtro3": {"name": keyF3, "value": FILTRO_3},
            "input": ""
        }
        let autor = document.querySelector(".autor").value;
        let api = this.props.api;
        console.log(getData);
        request
        .post(`/api/search`)
        .send(getData)
        .set('Accept', 'application/json')
        .end(function(err, res){
            if (res.status === 404) {
                console.errr(err);
            } else {
                console.log(res.body);
                //self.props.renderFilter(res.body,autor)
            }
        });
        return
    }
    render () {
        return (
            <div className="filterSelect flex align-center">

            <select className="FILTRO_1" onChange={this.showFilters.bind(this)}>
            <option value="0" >filtrar por:</option>
            {
                this.state.filter1.map(item => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })
            }
            </select>
            <select className="FILTRO_2" onChange={this.showFilters.bind(this)}>
            <option value="0" >filtrar por:</option>
            {
                this.state.filter2.map(item => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })
            }
            </select>
            <select className="FILTRO_3" onChange={this.showFilters.bind(this)}>
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
