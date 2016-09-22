import React from 'react'
import { hashHistory } from 'react-router'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'

if (process.env.BROWSER) {
    require("../style/font.scss");
    require("../style/Page.scss");
}
export default class App extends React.Component {

    render () {
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
