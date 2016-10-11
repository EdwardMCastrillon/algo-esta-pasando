import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Calendar from '../utils/calendar'

import AgendaStore from '../providers/agendaStore'
import '../style/Posts.scss'
import '../style/select.scss'

export default class Inicio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: AgendaStore.getAgendas(),
            mes: Calendar.meses()[new Date().getMonth()],
            daymes: Calendar.init(new Date().getMonth()+1)
        }
    }
    componentWillUnmount() {
        AgendaStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        AgendaStore.init()

    }
    updateData() {
        this.setState({
            posts:AgendaStore.getAgendas()
        })
    }
    componentDidMount(){

        AgendaStore.addChangeListener(this.updateData.bind(this));
    }
    openSelect(){
        document.querySelector(".cs-select").classList.toggle("cs-active");
    }
    selectChange(mes){
        let mesKey = Calendar.meses().indexOf(mes);
        this.setState({
            mes: mes,
            daymes: Calendar.init(mesKey+1)
        })
    }
    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <section className="P-B-Post agenda" >
                        <h1>Próximos eventos</h1>
                        <div className="cs-select cs-skin-elastic" onClick={this.openSelect.bind()}>
                            <span className="cs-placeholder">{this.state.mes}</span>
                            <div className="cs-options">
                                <ul>
                                    <li className="flag-france" data-option="" data-value="france"></li>
                                    {
                                        Calendar.meses().map(item => {
                                            return(
                                                <span onClick={this.selectChange.bind(this,item)}>{item}</span>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="days flex wrap">
                            {
                                [...Array(this.state.daymes)].map(function(item, i){
                                    return(
                                        <span>
                                            {i+1}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            )
        } else{
            return(
                <div>
                    <h1> Cargando Datos.. </h1>
                </div>
            )
        }
    }
}
