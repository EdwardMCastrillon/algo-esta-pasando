import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'
import FunctExtra from '../utils/functExtra'

import Menus from '../constants/menus'
import Logo from "../img/logoAep.png"
import Edicion from '../img/edicion.jpg'
import EdicionClosed from '../img/edicion_colaps.jpg'

require("../style/NavBar.scss");
require("../style/icomoon/style.scss");



export default class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            logo: Edicion
        }
    }
    logoClosed(){
        FunctExtra.closedNav()
        this.setState({
            logo: EdicionClosed
        })
    }
    render() {
        return (
            <div id="NavBar" className="NavBar" onClick={this.logoClosed.bind(this)}>
                <div className="NavBar-title">
                    <img src={ this.state.logo } />
                </div>
                <div className="NavBar-links">
                    {
                        Menus.map(item => {
                            let url = (item == "inicio") ? "/" : `/${item}`
                            let icon = `i-${item}`
                            let option = item.replace(/_/g, ' ')
                            return (
                                <Link key={ item } to={ url }>
                                    <span className="flex align-center">
                                        <i className={ icon }></i>
                                        <span>{ option }</span>
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
