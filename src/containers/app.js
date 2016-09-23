import React from 'react'
import { hashHistory } from 'react-router'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'

if (process.env.BROWSER) {
    require("../style/font.scss");
    require("../style/Page.scss");
    require("../style/Animate.scss");
}
export default class App extends React.Component {

    render () {
        // window.onresize = function(event) {
        //     let content = document.getElementsByClassName("P-B-Post")[0];
        //     let nav = document.getElementById("NavBar");
        //     content.style.width = (window.innerWidth - nav.offsetWidth)+"px";
        // };
        return (
            <div className="Page">
                <Nav/>
                <div className="Page-body">
                    <div className="Page-body-top">
                        <Buscar/>
                    </div>
                    {this.props.children}
                </div>
                <article className="SidebarLeadership">

                </article>
            </div>
        )
    }
}

// App.propTypes = {
//     children: React.PropTypes.object
// }
