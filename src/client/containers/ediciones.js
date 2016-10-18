import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Edicion from '../constants/edicion'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts:Edicion.getEdiciones()
        })

    }
    componentWillUnmount() {
        Edicion.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        Edicion.init()
    }
    updateData() {
        this.setState({
            posts:Edicion.getEdiciones()
        })
    }
    componentDidMount(){
        Edicion.addChangeListener(this.updateData.bind(this))
        // this.getData()
    }
    changeEdition(id){
        localStorage.setItem("edicion",id)
        location.reload();
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return (
                <div className="P-B-ContentPost" style={divStyle}>
                    <section className="P-B-Post post">
                        {
                            this.state.posts.map(item => {
                                return(
                                    <div onClick={this.changeEdition.bind(this,item.EDNUMERO)}>{item.Título}</div>
                                )
                            })
                        }
                    </section>
                </div>
            )
        }else{

            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <h1> Cargando Datos.. </h1>
                </div>
            )
        }

    }
}
