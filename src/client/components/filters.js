import React from 'react'
import Edicion from '../constants/edicion'
import PerfilStore from '../providers/perfilStore'
import Search from '../providers/search'
import FunctExtra from '../utils/functExtra'
import request from 'superagent'

export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            filter1:Edicion.getEdicionfiltros("FILTRO_1"),
            namefilter1:Edicion.getNamefiltros("FILTRO_1"),
            filter2:Edicion.getEdicionfiltros("FILTRO_2"),
            namefilter2:Edicion.getNamefiltros("FILTRO_2"),
            filter3:Edicion.getEdicionfiltros("FILTRO_3"),
            namefilter3:Edicion.getNamefiltros("FILTRO_3"),
            autores: PerfilStore.getPerfiles(),
            filter:''
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
        if(this.state.filter1.length == 0){
            document.querySelector(".FILTRO_1").parentNode.style.display = "none"
        }
        if(this.state.filter2.length == 0){
            document.querySelector(".FILTRO_2").parentNode.style.display = "none"
        }
        if(this.state.filter3.length == 0){
            document.querySelector(".FILTRO_3").parentNode.style.display = "none"
        }
    }
    searchClick(){
        Search.removeChangeListener(this.updateFilter.bind(this))
        let searchInput = document.getElementById("searchInput").value;
        let getData = {
            "filtro1": {
                "name": "",
                "value": ""
            },
            "filtro2": {"name": "", "value": ""},
            "filtro3": {"name": "", "value": ""},
            "input": searchInput
        }
        Search.init(getData)
        Search.addChangeListener(this.updateFilter.bind(this))
    }
    onKeyUpInput(){
        if (event.keyCode == 13) {
            this.searchClick()
        }
    }
    showFilters(){
        console.log("showFilters");
        Search.removeChangeListener(this.updateFilter.bind(this))
        self = this;
        let FILTRO_1 = '';
        let FILTRO_2 = ''
        let FILTRO_3 = ''
        let keyF1 = '',keyF2 = '',keyF3 = '';
        if(this.state.filter1.length > 0){

            if(document.querySelector(".FILTRO_1").value != "0"){
                keyF1 = Edicion.getObjectkeys("FILTRO_1")
                FILTRO_1 = document.querySelector(".FILTRO_1").value
            }
        }
        if(this.state.filter2.length > 0){
            if(document.querySelector(".FILTRO_2").value != "0"){
                keyF2 = Edicion.getObjectkeys("FILTRO_2")
                FILTRO_2 = document.querySelector(".FILTRO_2").value
            }
        }
        if(this.state.filter3.length > 0){

            if(document.querySelector(".FILTRO_3").value != "0"){
                keyF3 = Edicion.getObjectkeys("FILTRO_3")
                FILTRO_3 = document.querySelector(".FILTRO_3").value
            }
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
        // let api = this.props.api;
        Search.init(getData)

        Search.addChangeListener(this.updateFilter.bind(this))
    }
    updateFilter(){
        this.props.renderFilter(Search.getsearchs())
    }
    prueba(obj){
        // this.setState({
        //     filter:obj
        // })
        // this.showFilters()
        let keyF1 = Edicion.getObjectkeys("FILTRO_1")
        let getData = {
            "filtro1": {
                "name": keyF1,
                "value": obj.filter
            },
            "filtro2": {"name": '', "value": ''},
            "filtro3": {"name": '', "value": ''},
            "input": ""
        }
        // let api = this.props.api;
        Search.init(getData)

        Search.addChangeListener(this.updateFilter.bind(this))
        console.log("prueba");
        // if(this.state.filter1.indexOf(obj.filter) > -1){
        //     document.querySelector(".FILTRO_1").value = obj.filter
        //     this.showFilters()
        //     return
        // }
        // if(this.state.filter2.indexOf(obj.filter) > -1){
        //     document.querySelector(".FILTRO_2").value = obj.filter
        //     return
        // }
        // if(this.state.filter3.indexOf(obj.filter) > -1){
        //     document.querySelector(".FILTRO_3").value = obj.filter
        //     return
        // }
    }
    componentWillReceiveProps(obj){
        console.log("componentWillReceiveProps",obj);
        // if(obj.filter){
        //     this.prueba(obj)
        // }
    }
    shouldComponentUpdate(newProps, newState) {
        console.log("shouldComponentUpdate ",newProps,newState);
    }
    render () {

        return (
            <div className="filterSelect flex align-center active">
                <div className="contentSelect">
                    <select className="FILTRO_1" onChange={this.showFilters.bind(this)}>
                        <option value="0" >{this.state.namefilter1}</option>
                        {
                            this.state.filter1.map(item => {
                                return(
                                    <option value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="contentSelect">
                    <select className="FILTRO_2" onChange={this.showFilters.bind(this)}>
                        <option value="0" >{this.state.namefilter2}</option>
                        {
                            this.state.filter2.map(item => {
                                return(
                                    <option value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="contentSelect">
                    <select className="FILTRO_3" onChange={this.showFilters.bind(this)}>
                        <option value="0" >{this.state.namefilter3}</option>
                        {
                            this.state.filter3.map(item => {
                                return(
                                    <option value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="contentSelect">
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
                <div>
                    <div className="filter flex  align-center ">
                        <input id="searchInput" type="text" onKeyUp={this.onKeyUpInput.bind(this)} placeholder="Escribe para buscar"/>
                    </div>
                </div>
            </div>
        )
    }
}
