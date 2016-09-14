import React, { PropTypes, Component } from "react";
import { Link } from 'react-router'
import Menus from "../constants/menus";


if (process.env.BROWSER) {
    require("../style/NavBar.scss");
    require("../style/flex.scss");
    require("../style/icomoon/style.scss");
}
export default class NavBar extends Component {


    render() {

        return (
            <div className="NavBar">
                <div className="NavBar-title">
                    <img src="../src/img/edicion.jpg"/>
                </div>
                <div className="NavBar-links">
                    {
                        Menus.map(item => {
                            let url = `/${item}`
                            let icom = `i-${item}`
                            return (
                                <Link key={ item }  to={url}><span className="flex align-center"><i className={icom}></i>{item}</span></Link>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}
