import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'
import FunctExtra from '../utils/functExtra'
import Menus from '../constants/menus'
import LogoGif from "../img/edicion.gif"


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
            slogan:''
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
        if(document.body.clientWidth > 500){
            if(!document.querySelector(".NavBar:hover") && document.querySelector(".closed")){
                this.setState({
                    background:{
                        'background':`url(${this.state.logoClosed}) center center`,
                        'backgroundSize': 'cover'
                    }
                })
            }
        }
    }
    classClosepMenu(){
        if(document.body.clientWidth > 500){
            document.querySelector("#app").classList.add("closed")
        }
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
            if(document.querySelector(`.active span`)){
                document.querySelector(`.active span`).removeAttribute("style");
                document.querySelector(`.active i`).removeAttribute("style");
                document.querySelector(`.active`).removeAttribute("style");
                document.querySelector(`.active i`).style.color = document.querySelector(`.active i`).getAttribute("data-color");
            }
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
            if(document.querySelector(`.active`) && document.querySelector(`.active i`)){
                let color = document.querySelector(`.active i`).getAttribute("data-color");;
                document.querySelector(`.active span`).style.color = color;
                document.querySelector(`.active i`).style.background = color;
                document.querySelector(`.active i`).style.color = "#fff";
            }
        },300)
        if(document.body.clientWidth < 500){
            document.querySelector("#NavBar").classList.add("ClosedMenu")
        }
        window.addEventListener('resize', function(event){
            if(document.body.clientWidth < 500){
                    document.querySelector("#app").classList.add("phone")
                    document.querySelector("#NavBar").classList.add("ClosedMenu")
            }else{
                    document.querySelector("#app").classList.remove("phone")
            }
        });
    }
    ClosedMenuPhone(){
        if(document.querySelector(".ClosedMenu")){
            document.querySelector("#NavBar").classList.remove("ClosedMenu")
            document.querySelector(".Hamburger").classList.add("MenuOpen")
            document.querySelector(".Hamburger").classList.remove("MenuClose")
        }else {
            document.querySelector("#NavBar").classList.add("ClosedMenu")
            document.querySelector(".Hamburger").classList.remove("MenuOpen")
            document.querySelector(".Hamburger").classList.add("MenuClose")
        }

    }
    render() {
        let redes = ''
        if(this.state.logoOpen == "" && this.props.edicion){
            redes = `<a target="_blank" href="${this.props.edicion.urlTwitter}"><i class="i-twitter"></i></a><a target="_blank" href="${this.props.edicion.urlInstagram}"><i class="i-instagram"></i></a>`
            let f = this.props.edicion.font_menu_izq.replace(/&quot;/g, '').replace(";","").split(":")
            this.setState({
                logoOpen:this.props.edicion.logoOpen,
                logoClosed:this.props.edicion.logoClosed,
                menu:this.props.edicion.menu,
                redes:redes,
                textCopyLeft:this.props.edicion.textCopyLeft,
                Info_de_contacto:this.props.edicion.Info_de_contacto,
                LogoAEP:`https://tupale.co/milfs/images/secure/?file=300/${this.props.edicion.AgregaunaImagen}`,
                slogan:this.props.edicion.slogan,
                font_menu_izq:{
                    "font-family":f[1]
                }
            })
            this.openNav()
        }
        let behind = {
            background: this.props.edicion.coloraux
        }
        return (
            <div id="NavBar" className="NavBar" onClick={this.classClosepMenu.bind()}
                onMouseEnter={this.logoOpen.bind(this)} onMouseOut={this.logoClosed.bind(this)}>



                <div className="Hamburger MenuClose" onClick={this.ClosedMenuPhone.bind(this)}>

                    <div className="behind" style={behind}> </div>
                    <div className="wrapper">
                        <div className="NavHamburgerLine1">
                            <div className="inner">
                            </div>
                        </div>
                        <div className="NavHamburgerLine2" >
                            <div className="inner">
                            </div>
                        </div>
                        <div className="NavHamburgerLine3" >
                            <div className="inner">
                            </div>
                        </div>
                    </div>
                    <div className="hit" > </div>
                </div>



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
                                            <span style={this.state.font_menu_izq} className={this.state.hideName}>{ option }</span>
                                        </span>
                                    </Link>
                                );
                            }
                        })
                    }
                </div>
                <div className="NavBar-footer">
                    <div>
                        <Link to="/sobre_algo_esta_pasando">
                            <img src={ this.state.LogoAEP } />
                            <span style={this.state.font_menu_izq}  className="slogan">{this.state.slogan}</span>
                        </Link>

                    </div>
                    <div className="contenRedes" style={this.state.font_menu_izq}  dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.redes)}></div>

                </div>
            </div>
        );

    }
}
