/*
* Module dependencies
*/
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Nav from '../components/NavBar'
import Buscar from '../components/buscar'
import Init from '../constants/init'
import Edicion from '../constants/edicion'
import Loader from '../components/loader'

// import Aep from '../providers/aep'
// Estilos

import "../style/font.scss"
import "../style/Page.scss"
import "../style/Animate.scss"
import "../style/flex.scss"


export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            edicion:Edicion.getEdicion(),
            load:Init.getInit()
        })

    }
    componentWillMount(){
        Init.init()
        Edicion.init()
    }
    updateData() {
        this.setState({
            edicion:Edicion.getEdicion()
        })
    }
    init(){
        this.setState({
            load:Init.getInit()
        })
    }
    componentDidMount(){
        Init.addChangeListener(this.init.bind(this))
        Edicion.addChangeListener(this.updateData.bind(this))
    }
    createMarkup(e,text){
        return {__html: text};
    }
    prueba(){
        console.log("prueba app");
    }
    componentDidUpdate(){

    }
    render () {
        if(this.state.edicion && this.state.load){
            let component = "div",transitionName="",
            transitionEnterTimeout=10,transitionLeaveTimeout=10;

            let pathname = this.props.location.pathname.split("/")
            if(pathname.length > 2){
                component = "div",transitionName = "example",
                transitionEnterTimeout = 1300,transitionLeaveTimeout = 1300;
            }
            return (
                <div className="Page">
                    <Nav edicion={this.state.edicion}/>
                    <div className="Page-body">
                        <div className="Page-body-top">
                            <Buscar route={this.props} prueba={this.prueba.bind(this)}/>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            )
        }else {
            return (
                <Loader/>
            )
        }

    }
}
// <div>
//     <h1> Cargando Datos.. </h1>
// </div>
// <ReactCSSTransitionGroup
//     component={component}
//     transitionName={transitionName}
//     transitionEnterTimeout={transitionEnterTimeout}
//     transitionLeaveTimeout={transitionLeaveTimeout} >
//     {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
//
// </ReactCSSTransitionGroup>
