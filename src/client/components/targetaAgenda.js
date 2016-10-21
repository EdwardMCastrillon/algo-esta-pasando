import React from 'react'
import FunctExtra from '../utils/functExtra'
import Map from '../components/map'
import { Link } from 'react-router'
export default class TargetaAgenda extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: '',
            popup:''
        }
    }
    openPopup(data){

        const PositionMap = ({ data, position }) => (
            <div className="popupConten open">
                <div className="popup-close-button" onClick={this.closedPopup.bind(this)}>×</div>
                <div className="popup-content-wrapper">
                    <div className="popup-content">
                        <Map position={position} idEvent={data.id}></Map>
                        <div className="popup-content-name">
                            {data.Lugardelevento}
                        </div>
                    </div>
                </div>
                <div className="popup-tip-container">
                    <div className="popup-tip"></div>
                    <div className="popup-tiptar"></div>
                </div>
            </div>
        );
        let position = {
            lat: data['Georreferencia(mapa)'].split(" ")[1],
            lng: data['Georreferencia(mapa)'].split(" ")[0]
        }
        this.setState({
            popup: <PositionMap data={data} position={position}></PositionMap>
    })
}
closedPopup(){
    this.setState({
        popup: ''
    })
}
render () {

    var divStyle = {
        background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${this.props.data.AgregaunaImagen}) center center`,
        'backgroundSize': 'cover'
    };
    return (
        <section>
            <article id={`e${this.props.data.id}`}>
                <div className="diaEvent" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,document.getElementById(`event${this.props.data.dia}`).innerHTML)}></div>
                <figure className="FigureEvent" style={divStyle}>
                </figure>
                <div className="nameEvent">
                    {this.props.data.Nombredelaactividad}
                </div>
                <div>
                    <span className="hora">
                        {this.props.data.Horadeinicio} - {this.props.data.Horadefinalización}
                    </span>
                    <span className="organizador">
                        {this.props.data.Organizadoresdelevento}
                    </span>
                </div>
                <div className="contenIcon">
                    <Link to={`agenda/${this.props.data.id}`}>
                        <i className="i-plus"></i>
                    </Link>
                    <i onClick={this.openPopup.bind(this,this.props.data)} className="i-mapa "></i>
                    {this.state.popup}
                </div>
            </article>
        </section>
    )
}
}
