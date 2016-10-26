import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'
// import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'
import Menus from '../constants/menus'
// import Logo from "../img/logoAep.png"


require("../style/NavBar.scss");
require("../style/icomoon/style.scss");
const ACTIVE = { color: 'red' }
export default class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            logoOpen:'',
            logoClosed:'',
            background:{},
            hideName:"hideName",
            hidepad:"hidepad",
            LogoAEP:'',
        }
    }
    logoOpen(){
        if(document.querySelector(".NavBar:hover")){
            this.setState({
                background:{
                    'background':`url(${this.state.logoOpen}) center center`,
                    'backgroundSize': 'cover'
                }
            })
        }
    }
    logoClosed(){
        if(!document.querySelector(".NavBar:hover") && document.querySelector(".closed")){
            this.setState({
                background:{
                    'background':`url(${this.state.logoClosed}) center center`,
                    'backgroundSize': 'cover'
                }
            })
        }
    }
    classClosepMenu(){
        document.querySelector("#app").classList.add("closed")
    }
    openNav(){
        this.setState({
            background:{
                'background':`url(${this.props.edicion.logoOpen}) center center`,
                'backgroundSize': 'cover'
            }
        })
    }
    iconClick(obj,color){
        if(document.querySelector(`.active`)){
            document.querySelector(`.active span`).removeAttribute("style");
            document.querySelector(`.active i`).removeAttribute("style");
            document.querySelector(`.active`).removeAttribute("style");
            document.querySelector(`.active i`).style.color = document.querySelector(`.active i`).getAttribute("data-color");
        }

        document.querySelector(`.${obj} span`).style.color = color;
        document.querySelector(`.${obj} i`).style.background = color;
        document.querySelector(`.${obj} i`).style.color = "#fff";
    }
    iconHover(obj,color){
        if(document.querySelector(`.${obj}.active`)){
            document.querySelector(`.${obj}.active span`).style.color = color;
            document.querySelector(`.${obj}.active i`).style.background = color;
            document.querySelector(`.${obj}.active i`).style.color = "#fff";
        }else{
            if(document.querySelector(`.${obj} span`)){
                document.querySelector(`.${obj} span`).removeAttribute("style");
                document.querySelector(`.${obj} i`).style.color = color;
                if(!document.querySelector(`.${obj}.active`)){
                    document.querySelector(`.${obj} i`).style.background ="transparent"
                }
            }
            document.querySelector(`.${obj}:hover`).style.color = color;
        }
    }
    iconOut(obj,color){
        if(!document.querySelector(`.${obj}:hover`) && !document.querySelector(`.${obj}.active`)){
            document.querySelector(`.${obj}`).removeAttribute("style");
        }

    }
    componentDidMount(){
        setTimeout(function(){
            let color = document.querySelector(`.active i`).getAttribute("data-color");;
            document.querySelector(`.active span`).style.color = color;
            document.querySelector(`.active i`).style.background = color;
            document.querySelector(`.active i`).style.color = "#fff";
        },300)
    }
    render() {
        let redes = ''
        if(this.state.logoOpen == "" && this.props.edicion){
            redes = `<a target="_blank" href="${this.props.edicion.urlTwitter}"><i class="i-twitter"></i></a><a target="_blank" href="${this.props.edicion.urlInstagram}"><i class="i-instagram"></i></a>`
            this.setState({
                logoOpen:this.props.edicion.logoOpen,
                logoClosed:this.props.edicion.logoClosed,
                menu:this.props.edicion.menu,
                redes:redes,
                textCopyLeft:this.props.edicion.textCopyLeft,
                LogoAEP:`https://tupale.co/milfs/images/secure/?file=300/${this.props.edicion.AgregaunaImagen}`

            })
            this.openNav()
        }

        return (
            <div id="NavBar" className="NavBar" onClick={this.classClosepMenu.bind()}
            onMouseEnter={this.logoOpen.bind(this)} onMouseOut={this.logoClosed.bind(this)}>
            <div className="NavBar-title" style={this.state.background}> </div>
            <div className="NavBar-links">
            {
                Menus.map(item => {
                    if(this.state.menu){
                        let url = (item == "inicio") ? "/" : `/${item}`
                        let icon = `i-${item}`
                        let option = this.state.menu[item].name
                        let styleIcon={
                            color:this.state.menu[item].color
                        }
                        let clas = `${this.state.hidepad} ${item}`
                        return (
                            <Link activeClassName="active" key={ item } to={ url } className={clas} onClick={this.iconClick.bind(this,item,this.state.menu[item].color)}
                            onMouseEnter={this.iconHover.bind(this,item,this.state.menu[item].color)} onMouseOut={this.iconOut.bind(this,item,this.state.menu[item].color)}>
                            <span className="flex align-center">
                            <i className={ icon } style={styleIcon} data-color={this.state.menu[item].color}></i>
                            <span className={this.state.hideName}>{ option }</span>
                            </span>
                            </Link>
                        );
                    }
                })
            }
            </div>
            <div className="NavBar-footer">
            <div>
            <img src={ this.state.LogoAEP } />
            </div>
            <div className="contenRedes" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.redes)}></div>
            <div className="copyright" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.textCopyLeft)}></div>
            </div>
            </div>
        );

    }
}
