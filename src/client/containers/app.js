/*
* Module dependencies
*/
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'
import Init from '../constants/init'
import Edicion from '../constants/edicion'
import Loader from '../components/loader'
import FunctExtra from '../utils/functExtra'
import Post from '../components/posts'
import Search from '../providers/search'
import "../style/font.scss"
import "../style/Page.scss"
import "../style/Animate.scss"
import "../style/flex.scss"
import "../style/phone.scss"

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            edicion:Edicion.getEdicion(),
            load:Init.getInit(),
            filter:'',
            posts:[],
            search:false
        })

    }
    componentWillMount(){
        Init.init()
        Edicion.init()
    }
    updateData() {
        if(getUrlVars()["EdicionId"]){
            Edicion.getEdicionId(getUrlVars()["EdicionId"])
            let url = window.location.href.replace(`?EdicionId=${getUrlVars()["EdicionId"]}`,"")
            window.location.href = url
        }
        let font_parrafos = '';
        if(Edicion.getEdicion().font_parrafos){
            font_parrafos = Edicion.getEdicion().font_parrafos.replace(/&quot;/g, '').replace(";","").split(":")[1]
        }
        this.setState({
            edicion:Edicion.getEdicion(),
            font_parrafos:{
                "font-family":font_parrafos
            }
        })
    }
    init(){
        this.setState({
            load:Init.getInit()
        })
    }
    componentDidMount(){
        Init.addChangeListener(this.init.bind(this))
        Edicion.addChangeListener(this.updateData.bind(this))
        if(document.body.clientWidth < 500){
            document.querySelector("#app").classList.add("phone")
        }
    }
    createMarkup(e,text){
        return {__html: text};
    }
    searchFilterContenido(obj){
        console.log(obj.length);
        if(obj.length > 0){
            console.log("ENTRAA");
            document.querySelector(".contentSearch").classList.remove('active');
            this.setState({
                posts:obj,
                search:true
            })
        }else{
            console.log("no ENTRAA");
            document.querySelector(".contentSearch").classList.add('active');
            this.setState({
                posts:[],
                search:false
            })
        }

    }
    changeFilterApp(s,filter){
        document.querySelector(".filterSelect").classList.remove('active');
        if(document.querySelector(".Page-body > .P-B-ContentPost")){
            document.querySelector(".Page-body > .P-B-ContentPost").style.marginTop = "5em"
        }
        if(document.querySelector(".Page-body > .showContent.Post")){
            document.querySelector(".Page-body > .showContent.Post").style.marginTop = "95px"
        }
        Search.removeChangeListener(this.searchFilterAux.bind(this))
        self = this;
        let FILTRO_1 = '';
        let FILTRO_2 = ''
        let FILTRO_3 = ''
        let keyF1 = '',keyF2 = '',keyF3 = '';

        switch (s) {
            case 1:
            keyF1 = Edicion.getObjectkeys("FILTRO_1")
            FILTRO_1 = filter
            break;
            case 2:
            keyF2 = Edicion.getObjectkeys("FILTRO_2")
            FILTRO_2 = filter
            break;
            case 3:
            keyF3 = Edicion.getObjectkeys("FILTRO_3")
            FILTRO_3 = filter
            break;
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
        // let api = this.props.api;
        Search.init(getData)

        Search.addChangeListener(this.searchFilterAux.bind(this))

    }
    searchFilterAux(){
        this.searchFilterContenido(Search.getsearchs())
    }
    renderChildren(props) {
        return React.cloneElement(props.children, {
            changeFilterApp: this.changeFilterApp.bind(this)
        })
    }
    render () {
        if(this.state.edicion && this.state.load){
            let component = "div",transitionName="",
            transitionEnterTimeout=10,transitionLeaveTimeout=10;

            let pathname = this.props.location.pathname.split("/")
            if(pathname.length > 2){
                component = "div",transitionName = "example",
                transitionEnterTimeout = 1300,transitionLeaveTimeout = 1300;
            }
            let font1 = this.state.edicion.font_1_url
            let font2 = this.state.edicion.font_2_url
            let f = this.state.edicion.font_menu_izq.replace(/&quot;/g, '').replace(";","").split(":")
            let font_menu_izq = {
                "font-family":f[1]
            }
            var divStyle = {
                height: window.innerHeight - 50,
                top:"46px"
            };
            return (
                <div className="Page" style={this.state.font_parrafos}>
                    <link href={font1} rel='stylesheet' type='text/css'/>
                    <link href={font2} rel='stylesheet' type='text/css'/>
                    <Nav edicion={this.state.edicion}/>
                    <div className="Page-body">
                        <div className="Page-body-top">
                            <Buscar filter={this.state.filter} changeFilterApp={this.searchFilterContenido.bind(this)} route={this.props}/>
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
                        {this.renderChildren(this.props)}

                    </div>
                </div>
            )
        }else {
            return (
                <Loader/>
            )
        }

    }
}
// <div className="Page-body-footer flex">
//     <div style={font_menu_izq} className="info">{this.state.edicion.Info_de_contacto}</div>
//     <div style={font_menu_izq} className="copyright flex" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.edicion.textCopyLeft)}></div>
// </div>


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('?');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
