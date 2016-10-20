import React from 'react'
import FunctExtra from '../utils/functExtra'
import Contenido from '../providers/contenidoStore'
import Comentarios from '../providers/comentarioStore'
import Recursos from '../providers/recursoStore'
import Aep from '../providers/aep'

export default class PostContenido1 extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: false,
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
        switch (this.props.route.path.replace("/","").replace("/","").replace(":id","")) {
            case "contenido":
            cp = Contenido.getContenido(p);
            if(cp["Escribir/Párrafos/Texto"]){
                text = cp["Escribir/Párrafos/Texto"];
            }else{
                text = cp["Resumen"];
            }
            break;
            case "comentarios":
            cp = Comentarios.getComentario(p);
            text = cp["Escribir/Párrafos/Texto"];
            break;
            case "centro_de_recursos":
            cp = Recursos.getRecurso(p);
            if(cp["EDITOR(Recurso)"]){
                text = cp["EDITOR(Recurso)"];
            }else{
                text = cp["Resumen"];
            }
            break;
            case "aep":
            case "aep_":
            cp = Aep.getAeP(p);
            text = cp["EDITOR(Recurso)"];
            break;
        }
        let img = false;
        if(cp.AgregaunaImagen){
            img = `https://tupale.co/milfs/images/secure/?file=full/${cp.AgregaunaImagen}`
        }
        this.setState({
            image: img,
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
        let figure = '';
        if(this.state.image){
            figure = <ImgPost background={background} />
        }


        return (
            <section className="showContent Post"  style={divStyle}>
                {figure}
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
const ImgPost = ({ background }) => (
    <figure className="Figure" style={background}></figure>
);
// <h2 className="Subtitulo">
//     "¿CUÁL SERÁ EL MIEDO A HABLAR?"
//     "¿SERÁ UNA GRAN ANALOGÍA AL MIEDO DE TODOS LOS COLOMBIANOS"
// </h2>
