import React from 'react'
import { Link } from 'react-router'
import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'
import PosContenido from './contenido'
import Edicion from '../constants/edicion'
import PerfilStore from '../providers/perfilStore'
import Post from '../components/posts'
import Filters from '../components/filters'
import '../style/buscar.scss'
const ACTIVE = { color: 'red' }
export default class Buscar extends React.Component {
    constructor (props) {
        super(props)
        this.state =  ({
            itemNavTop: Aep.getAePs(),
            ediciones:Edicion.getEdiciones(),
            posts:[]
        })
    }
    componentWillUnmount() {
        Edicion.removeChangeListener(this.updateEdicion.bind(this))
    }
    componentWillMount(){
        Aep.init();
        Edicion.init();
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
    updateData() {
        this.setState({
            itemNavTop: Aep.getAePs()
        })
    }
    updateEdicion(){
        this.setState({
            ediciones: Edicion.getEdiciones()
        })
    }

    componentDidMount(){
        Aep.addChangeListener(this.updateData.bind(this))
        Edicion.addChangeListener(this.updateEdicion.bind(this))
    }
    renderFilter(obj,autor){
        if(obj.length > 0){
            document.querySelector(".contentSearch").classList.remove('active');
            this.setState({
                posts:obj,
                search:true
            })
        }else{
            document.querySelector(".contentSearch").classList.add('active');
            this.setState({
                posts:[],
                search:false
            })
        }
    }
    activeFilter(){
        var className = document.querySelector(".filterSelect").className;
        if ( className.replace(/[\n\t]/g, " ").indexOf("active") > -1 ) {
            document.querySelector(".filterSelect").classList.remove('active');
            if(document.querySelector(".Page-body > .P-B-ContentPost")){
                document.querySelector(".Page-body > .P-B-ContentPost").style.marginTop = "5em"

            }
            if(document.querySelector(".Page-body > .showContent.Post")){
                document.querySelector(".Page-body > .showContent.Post").style.marginTop = "95px"
            }
        }else{
            document.querySelector(".filterSelect").classList.add('active');
            if(document.querySelector(".Page-body > .P-B-ContentPost")){
                document.querySelector(".Page-body > .P-B-ContentPost").style.marginTop = "3em"
            }
            if(document.querySelector(".Page-body > .showContent.Post")){
                document.querySelector(".Page-body > .showContent.Post").style.marginTop = "3em"
            }
        }
    }

    render () {
        let urlAux = "aep"
        switch (this.props.route.location.pathname.split("/")[1]) {
            case "contenido":
            case "comentarios":
            case "centro_de_recursos":
            case "aep":
            case "agenda":
            urlAux = "aep_"
            break;
            case "aep_":
            urlAux = "aep"
            break;
        }
        var divStyle = {
            height: window.innerHeight - 50,
            top:"46px"
        };

        return (
            <div>
                <div id="NavBarTop" className="flex  align-center justify-center">
                    {
                        this.state.itemNavTop.map(item => {
                            let url = `/${urlAux}/${item.id}`
                            return(
                                <Link activeClassName={ACTIVE}  to={url}>
                                    <div className="item" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,item.Título)}></div>
                                </Link>

                            )
                        })
                    }
                </div>
                <div className="drawSearch" onClick={this.activeFilter.bind(this)} style={this.state.background}>
                    <i className="i-lupa"></i>
                </div>
                <Filters renderFilter={this.renderFilter.bind(this)} filter={this.props.filter} />
                <div className="contentSearch active" style={divStyle}>
                    <div className="P-B-ContentPost" style={divStyle}>
                        <section className="P-B-Post post">
                            {
                                this.state.posts.map(item => {
                                    let origen = ''
                                    let tipo = 1;
                                    if(item.origen == "Perfiles"){
                                        tipo = 2;
                                    }
                                    return(
                                        <Post key={ item.identificador } data={item} search={this.state.search} url="contenido/" tipo={tipo}/>
                                    )
                                })
                            }

                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
// <div className="filter flex  align-center ">
// <input type="text" placeholder="Escribe para buscar"/>
// </div>
// <div className="drawSearch" onClick={this.showFilters.bind(this)} style={this.state.background}>
// <i className="i-lupa"></i>
// </div>
