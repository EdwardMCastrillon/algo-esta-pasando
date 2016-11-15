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

import "../style/font.scss"
import "../style/Page.scss"
import "../style/Animate.scss"
import "../style/flex.scss"

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            edicion:Edicion.getEdicion(),
            load:Init.getInit(),
            filter:'',

        })

    }
    componentWillMount(){
        Init.init()
        Edicion.init()
    }
    updateData() {
        this.setState({
            edicion:Edicion.getEdicion(),
            font_parrafos:{
                "font-family":Edicion.getEdicion().font_parrafos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            }
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
    changeFilterApp2(filter){
        this.setState({
            filter:filter
        })

    }
    renderChildren(props) {
        return React.cloneElement(props.children, {
            changeFilterApp: this.changeFilterApp2.bind(this)
        })
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
            let font1 = this.state.edicion.font_1_url
            let font2 = this.state.edicion.font_2_url

            return (
                <div className="Page" style={this.state.font_parrafos}>
                    <link href={font1} rel='stylesheet' type='text/css'/>
                    <link href={font2} rel='stylesheet' type='text/css'/>
                    <Nav edicion={this.state.edicion}/>
                    <div className="Page-body">
                        <div className="Page-body-top">
                            <Buscar filter={this.state.filter} route={this.props}/>
                        </div>
                        {this.renderChildren(this.props)}
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
