import React, { PropTypes, Component } from "react";
import { Link, Router } from 'react-router'

import Menus from "../constants/menus";


if (process.env.BROWSER) {
    require("../style/NavBar.scss");
    require("../style/flex.scss");
    require("../style/icomoon/style.scss");
}
export default class NavBar extends Component {
    render() {
        return (
            <div id="NavBar" className="NavBar">
                <div className="NavBar-title">
                    <img src="../src/img/edicion.jpg"/>
                </div>
                <div className="NavBar-links">
                    {
                        Menus.map(item => {
                            let url = (item == "inicio")?"/":`/${item}`;
                            let icom = `i-${item}`
                            let option = item.replace(/_/g, ' ')
                            return (
                                <Link key={ item } to={url}><span className="flex align-center"><i className={icom}></i>{option}</span></Link>
                            );
                        })
                    }

                </div>
                <div className="NavBar-footer">
                    <img src="../src/img/logoAep.png"/>
                </div>
            </div>
        );
    }
}
