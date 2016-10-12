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
            idMes:new Date().getMonth()+1,
            mes: Calendar.meses()[new Date().getMonth()],
            calendar: Calendar.init(new Date().getMonth()+1)
        }
    }
    componentWillUnmount() {
        AgendaStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        AgendaStore.init()
    }
    updateData() {
        const e = AgendaStore.getAgendas();
        let Ameses = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]}
        for (var i = 0; i < e.length; i++) {
            let mes = new Date(e[i].Fecha).getMonth()+1;
            if(Ameses[mes]){
                Ameses[mes].push(e[i])
            }else{
                Ameses[mes] = []
                Ameses[mes].push(e[i])
            }
        }
        this.setState({
            posts:Ameses
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
            idMes: mesKey+1,
            mes: mes,
            calendar: Calendar.init(mesKey+1)
        })
    }
    createMarkup(e,text){
        return {__html: text};
    }
    renderEvento(item){
        console.log("renderEvento  ",item["Nombredelaactividad"]);
        return `<div>${item["Nombredelaactividad"]}</div>`
    }
    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };

        if (this.state.posts) {
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
                        <div className="days flex wrap" dangerouslySetInnerHTML={this.createMarkup(this,this.state.calendar)}>
                        </div>
                        <div>
                            {
                                this.state.posts[this.state.idMes].map(item => {
                                    return(
                                        <div>{item["Nombredelaactividad"]}</div>
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
