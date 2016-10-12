/*
* Module dependencies
*/
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'

// Estilos
import "../style/font.scss"
import "../style/Page.scss"
import "../style/Animate.scss"
import "../style/flex.scss"

export default class App extends React.Component {
    createMarkup(e,text){
        return {__html: text};
    }
    render () {

        let component = "div",transitionName="",
        transitionEnterTimeout=10,transitionLeaveTimeout=10;

        let pathname = this.props.location.pathname.split("/")
        if(pathname.length > 2){
            component = "div",transitionName = "example",
            transitionEnterTimeout = 1300,transitionLeaveTimeout = 1300;
        }
        return (
            <div className="Page">
                <Nav/>
                <div className="Page-body">
                    <div className="Page-body-top">
                        <Buscar/>
                    </div>
                    <ReactCSSTransitionGroup
                        component={component}
                        transitionName={transitionName}
                        transitionEnterTimeout={transitionEnterTimeout}
                        transitionLeaveTimeout={transitionLeaveTimeout} >
                        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}

                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}
// {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
