import React from 'react'
import FunctExtra from '../utils/functExtra'
import Contenido from '../providers/contenidoStore'
import Comentarios from '../providers/comentarioStore'
import Recursos from '../providers/recursoStore'

export default class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: ''
        }
    }

    componentWillMount(id) {
        // // Se captura el id del post que llega como parametro en la ruta
        let p;
        if(id){
            p = id
        }else{
            p = this.props.params.id;
        }
        let cp,text;
        debugger
        switch (this.props.route.path.replace("/","").replace("/","").replace(":id","")) {
            case "contenido":
            cp = Contenido.getContenido(p);
            text = cp["Escribir/Párrafos/Texto"];
            break;
            case "comentarios":
            cp = Comentarios.getComentario(p);
            text = cp["Escribir/Párrafos/Texto"];
            break;
            case "centro_de_recursos":
            cp = Recursos.getRecurso(p);
            text = cp["EDITOR(Recurso)"];
            break;
        }

        this.setState({
            image: `https://tupale.co/milfs/images/secure/?file=full/${cp.AgregaunaImagen}`,
            titulo: cp.Título,
            autor: cp.Autor,
            text: text
        })
    }
    createMarkup(e,text){
        return {__html: text};
    }
    componentDidMount(){
        // document.querySelector(".showContent").style.left = "0px"
        document.querySelector(".Descripcion").innerHTML = this.state.text
    }

    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };
        var background = {
            background: `rgb(234, 234, 234) url(${this.state.image}) top center`,
            'backgroundSize': 'cover'
        };
        let id = this.props.params.id
        return (
            <section className="showContent Post"  style={divStyle}>
                <figure className="Figure" style={background}>

                </figure>
                <div className="FlechaIzquierda"></div>
                <div className="FlechaDerecha"></div>
                <div className="AutorFoto">
                    {this.state.autor}
                </div>
                <article className="Detalle flex-container row">
                    <div className="colum">
                        <h1 className="Titulo" dangerouslySetInnerHTML={this.createMarkup(this,this.state.titulo)}></h1>

                        <div className="Descripcion" > </div>
                    </div>
                    <div className="column">

                    </div>
                </article>
            </section>
        )
    }
}
// <h2 className="Subtitulo">
//     "¿CUÁL SERÁ EL MIEDO A HABLAR?"
//     "¿SERÁ UNA GRAN ANALOGÍA AL MIEDO DE TODOS LOS COLOMBIANOS"
// </h2>
