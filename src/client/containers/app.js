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
    changeFilterApp2(filter){
        this.setState({
            filter:filter
        })
    }
    renderChildren(props) {
        return React.cloneElement(props.children, {
            changeFilterApp: this.changeFilterApp2.bind(this)
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
            return (
                <div className="Page" style={this.state.font_parrafos}>
                    <link href={font1} rel='stylesheet' type='text/css'/>
                    <link href={font2} rel='stylesheet' type='text/css'/>
                    <Nav edicion={this.state.edicion}/>
                    <div className="Page-body">
                        <div className="Page-body-top">
                            <Buscar filter={this.state.filter} route={this.props}/>
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
