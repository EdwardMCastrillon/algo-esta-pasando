import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import contenidoStore from '../providers/contenidoStore'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts:contenidoStore.getContenidos()
        })

    }
    componentWillUnmount() {
        contenidoStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        contenidoStore.init(118)
    }
    updateData() {
        this.setState({
            posts:contenidoStore.getContenidos()
        })
    }
    componentDidMount(){
        contenidoStore.addChangeListener(this.updateData.bind(this))
        // this.getData()
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
                                    <Post key={ item.identificador } data={item} url="contenido/" tipo="1"/>
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
