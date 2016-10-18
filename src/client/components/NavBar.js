import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'
// import Aep from '../providers/aep'
import FunctExtra from '../utils/functExtra'
import Menus from '../constants/menus'
import Logo from "../img/logoAep.png"


require("../style/NavBar.scss");
require("../style/icomoon/style.scss");


export default class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            logoOpen:'',
            logoClosed:'',
            background:{},
            hideName:"hideName",
            hidepad:"hidepad"
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
    iconHover(obj,color){
        document.querySelector(`.${obj}:hover`).style.color = color;
    }
    iconOut(obj,color){
        if(!document.querySelector(`.${obj}:hover`)){
            document.querySelector(`.${obj}`).removeAttribute("style");
        }

    }
    render() {
        if(this.state.logoOpen == "" && this.props.edicion){
            this.setState({
                logoOpen:this.props.edicion.logoOpen,
                logoClosed:this.props.edicion.logoClosed,
                menu:this.props.edicion.menu
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
                                    <Link key={ item } to={ url } className={clas}
                                        onMouseEnter={this.iconHover.bind(this,item,this.state.menu[item].color)} onMouseOut={this.iconOut.bind(this,item,this.state.menu[item].color)}>
                                        <span className="flex align-center">
                                            <i className={ icon } style={styleIcon}></i>
                                            <span className={this.state.hideName}>{ option }</span>
                                        </span>
                                    </Link>
                                );
                            }
                        })
                    }
                </div>
                <div className="NavBar-footer">
                    <img src={ Logo } />
                </div>
            </div>
        );

    }
}
