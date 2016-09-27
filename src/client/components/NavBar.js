import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'

import Menus from '../constants/menus';
import Logo from "../img/logoAep.png"
import Edicion from '../img/edicion.jpg'

require("../style/NavBar.scss");
require("../style/flex.scss");
require("../style/icomoon/style.scss");

export default class NavBar extends Component {
    render() {
        return (
            <div id="NavBar" className="NavBar">
                <div className="NavBar-title">
                    <img src={ Edicion } />
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
                                    { option }
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
