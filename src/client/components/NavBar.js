import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'
import FunctExtra from '../utils/functExtra'

import Menus from '../constants/menus'
import Logo from "../img/logoAep.png"
// import Edicion from '../img/edicion.jpg'
// import EdicionClosed from '../img/edicion_colaps.jpg'

require("../style/NavBar.scss");
require("../style/icomoon/style.scss");


export default class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // logo: logoAep,
            // width: "96px",
            hideName:"hideName",
            hidepad:"hidepad",
            // hover:"NavBar"
        }
    }
    logoClosed(){
        let self = this;

        self.setState({
            // logo: EdicionClosed,
            hideName:"hideName",
            hidepad:"hidepad"
        })

        // setTimeout(function(){
        //     console.log(document.getElementById("NavBar").offsetWidth);
        //
        //     if(document.getElementById("NavBar").offsetWidth < 230){
        //         console.log("logoClosed");
        //
        //         setTimeout(function(){
        //             self.setState({
        //                 logo: EdicionClosed,
        //                 width: "96px",
        //
        //             })
        //         },800)
        //         setTimeout(function(){
        //             self.setState({
        //                 hideName:"hideName",
        //                 hidepad:"hidepad",
        //                 hover:"NavBar"
        //             })
        //         },400)
        //     }
        // },100)

    }
    transitionComplete(){
        console.log("transitionComplete");
    }
    logoOpen(){
        console.log("logoOpen");
        this.setState({
            // logo: Edicion,
            // width: "210px",
            hideName:'',
            hidepad:'',
            // hover:"NavBar hover"
        })

    }
    classClosepMenu(){
        document.querySelector("#app").classList.add("closed")
    }
    render() {
        var background = {
            'backgroundSize': 'cover',
        };
        return (
            <div id="NavBar" className="NavBar" onClick={this.classClosepMenu.bind()}  onMouseEnter={this.logoOpen.bind(this)} onMouseOut={this.logoClosed.bind(this)} >
                <div className="NavBar-title" style={background}> </div>
                <div className="NavBar-links">
                    {
                        Menus.map(item => {
                            let url = (item == "inicio") ? "/" : `/${item}`
                            let icon = `i-${item}`
                            let option = item.replace(/_/g, ' ')
                            return (
                                <Link key={ item } to={ url } className={this.state.hidepad}>
                                    <span className="flex align-center">
                                        <i className={ icon }></i>
                                        <span className={this.state.hideName}>{ option }</span>
                                    </span>
                                </Link>
                            );
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
// <img src={ Logo } />
