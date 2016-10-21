import React from 'react'
import FunctExtra from '../utils/functExtra'
import { Link } from 'react-router'
export default class TargetaAgenda extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: ''
        }
    }

    render () {

        var divStyle = {
            background: `rgb(234, 234, 234) url(https://tupale.co/milfs/images/secure/?file=300/${this.props.data.AgregaunaImagen}) center center`,
            'backgroundSize': 'cover'
        };
        return (
            <section>
                <article>
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
                        <i className="i-mapa "></i>
                    </div>
                </article>
            </section>
        )
    }
}
