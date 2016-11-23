import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import TargetaAgenda from '../components/targetaAgenda'
import Calendar from '../utils/calendar'
import FunctExtra from '../utils/functExtra'
import AgendaStore from '../providers/agendaStore'
import '../style/agenda.scss'
import '../style/select.scss'
import Loader from '../components/loader'
import CompartirRedes from '../components/compartir'
import Footer from '../components/footer'
export default class Agenda extends React.Component {
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
        FunctExtra.showFilters()
        AgendaStore.addChangeListener(this.updateData.bind(this));
    }
    openSelect(){
        document.querySelector(".cs-select").classList.toggle("cs-active");
    }
    selectChange(mes){
        let mesKey = Calendar.meses().indexOf(mes);
        let self = this
        self.setState({
            calendar: Calendar.init(mesKey+1),
        })
        //Debido a que ambos state se actualizan al mismo tiempo el set da tiempo que se
        //actualize el calendar y luego select los dias de eventos.
        setTimeout(function(){
            self.setState({
                idMes: mesKey+1,
                mes: mes
            })
        },100)

    }
    createMarkup(e,text){
        return {__html: text};
    }
    closedPopup(){
        this.setState({
            popup: ''
        })
    }
    openPopupView(data){

        var style = {
            background: ` rgb(234, 234, 233) url(https://tupale.co/milfs/images/secure/?file=300/${data.AgregaunaImagen}) top center`,
            "backgroundSize":"contain",
        };

        if(document.querySelector(".activeList")){
            if(document.querySelector(".activeList .popupConten")){
                document.querySelector(".activeList .popupConten").classList.remove("open")
            }
            document.querySelector(".activeList").classList.remove("activeList")
        }
        if(document.querySelector(`#e${data.id}`)){
            document.querySelector(`#e${data.id}`).classList.add("activeList")
        }
        const PositionMap = ({ data, position ,style}) => (
            <div className="contendescripAgenda">
                <div className="popupContenBack" onClick={this.closedPopup.bind(this)}></div>
                <div className="popupConten open">
                    <div className="popup-close-button" onClick={this.closedPopup.bind(this)}>×</div>
                    <div className="popup-content-wrapper">
                        <div className="popup-content">
                            <div className ="img" style={style}></div>
                            <div className="flex column content-from">
                                <div className="">
                                    <span>{data['Descripcióndelaactividad']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Organizadores del evento:</span>
                                    <span>{data['Organizadoresdelevento']}</span>
                                </div>

                                <div className="form-agenda">
                                    <span>Lugar del evento:</span>
                                    <span>{data['Lugardelevento']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Fecha:</span>
                                    <span>{data['Fecha']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Hora de inicio:</span>
                                    <span>{data['Horadeinicio']} - {data['Horadefinalización']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Dirección:</span>
                                    <span>{data['Dirección']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Correo Electrónico:</span>
                                    <span>{data['CorreoElectrónico']}</span>
                                </div>

                                <div className="form-agenda">
                                    <span>Teléfono:</span>
                                    <span>{data['Teléfono']}</span>
                                </div>
                                <div className="form-agenda">
                                    <span>Celular:</span>
                                    <span>{data['Celular']}</span>
                                </div>
                                <CompartirRedes type="agenda" id={data.id}></CompartirRedes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        let position = {
            lat: data['Georreferencia(mapa)'].split(" ")[1],
            lng: data['Georreferencia(mapa)'].split(" ")[0]
        }
        this.setState({ popup: <PositionMap data={data} position={position} style={style}></PositionMap> })
    }
    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts) {
            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <section className="P-B-Post agenda" >
                        {this.state.popup}
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
                        <div className="days flex wrap justify-center" dangerouslySetInnerHTML={this.createMarkup(this,this.state.calendar)}>
                        </div>
                        <div className="event flex justify-space-around wrap">
                            {
                                this.state.posts[this.state.idMes].map(item => {
                                    if(item.Fecha){
                                        document.getElementById(`event${parseInt(item.Fecha.split("-")[2])}`)
                                        .classList.add("active")
                                        item.dia = `${parseInt(item.Fecha.split("-")[2])}`;
                                    }
                                    return(
                                        <TargetaAgenda data={item} openPopupView={this.openPopupView.bind(this)}></TargetaAgenda>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <Footer></Footer>
                </div>
            )
        } else{
            return(
                <Loader/>
            )
        }
    }
}
