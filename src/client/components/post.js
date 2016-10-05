import React from 'react'
import FunctExtra from '../utils/functExtra'


export default class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: ''
        }
    }

    componentWillMount() {
        // // Se captura el id del post que llega como parametro en la ruta
        // let id = this.props.params.id,
        //     posts = JSON.parse(localStorage.getItem('posts'));
        // // Obtenemos el post correspondiente para actualizar los datos del state.
        // let post = posts.filter(post => post.id === id)
        // this.setState({
        //   image:
        // })
    }
    componentDidMount(){
        document.querySelector(".showContent").style.left = "0px"
    }

    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };
        let id = this.props.params.id
        return (
            <section className="showContent Post"  style={divStyle}>
                <figure className="Figure">
                    <img src="http://www.hotelpark10.com.co/pagomio/wp-content/uploads/2014/10/medellin-colombia-hotelpark10.jpg" alt="" />
                </figure>
                <div className="FlechaIzquierda"></div>
                <div className="FlechaDerecha"></div>
                <div className="AutorFoto">
                    Fotografia: Lorem ipsum dolor sit amet
                </div>
                <article className="Detalle flex-container row">
                    <div className="colum">
                        <h1 className="Titulo">
                            ¿EL CINE SILENTE VOLVIÓ A COLOMBIA?
                        </h1>
                        <h2 className="Subtitulo">
                            "¿CUÁL SERÁ EL MIEDO A HABLAR?"
                            "¿SERÁ UNA GRAN ANALOGÍA AL MIEDO DE TODOS LOS COLOMBIANOS"
                        </h2>
                        <p className="Descripcion">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="column">

                    </div>
                </article>
            </section>
        )
    }
}
