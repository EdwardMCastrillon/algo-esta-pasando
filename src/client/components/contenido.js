//conenido1.js y contenido.js es el mismo componecte mejorar esto!!!
import React from 'react'
import FunctExtra from '../utils/functExtra'
import Contenido from '../providers/contenidoStore'
import Comentarios from '../providers/comentarioStore'
import Recursos from '../providers/recursoStore'
import Aep from '../providers/aep'
import AgendaStore from '../providers/agendaStore'
import RelacionesPost from '../providers/relacionesPost'
import Post from '../components/posts'

export default class PostContenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: false,
            titulo: '',
            postRelation: [],
            text:''
        }
    }
    loadContentAux(){
        // para poder pintar contenido en el mismo componente
        let self = this;
        setTimeout(function(){
            self.loadContent()
        },300)
    }
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }
    loadContent(){

        // // Se captura el id del post que llega como parametro en la ruta
        let p;
        // if(id){
        //     p = id
        // }else{
            p = this.props.params.id;
        // }
        let cp,text,titulo,classAep,postRelation={};
        classAep = "Descripcion "
        switch (this.props.route.path.replace("/","").replace("/","").replace(":id","")) {
            case "contenido":

            cp = Contenido.getContenido(p);
            if(!cp){
                Contenido.init();
                return
            }

            if(cp["Escribir/Párrafos/Texto"]){
                text = cp["Escribir/Párrafos/Texto"];
            }else{
                text = cp["Resumen"];
            }
            this.setState({
                postRelation: []
            })
            titulo = (cp.Nombredelaactividad)?cp.Nombredelaactividad:cp.Título;
            break;
            case "agenda":

            cp = AgendaStore.getAgenda(p);
            if(!cp){
                AgendaStore.init();
                return
            }
            text = cp["Descripcióndelaactividad"];
            titulo =  cp.Nombredelaactividad
            break;
            case "comentarios":

            cp = Comentarios.getComentario(p);
            if(!cp){
                Comentarios.init();
                return
            }
            text = cp["Escribir/Párrafos/Texto"];
            titulo =  cp.Título
            break;
            case "centro_de_recursos":

            cp = Recursos.getRecurso(p);
            if(!cp){
                Recursos.init();
                return
            }
            if(cp["EDITOR(Recurso)"]){
                text = cp["EDITOR(Recurso)"];
            }else{
                text = cp["Resumen"];
            }
            titulo =  cp.Título
            break;
            case "aep":
            case "aep_":
            cp = Aep.getAeP(p);
            text = cp["EDITOR(Recurso)"];
            text = cp.Resumen
            titulo =  cp.Título
            RelacionesPost.init(titulo);
            classAep += " "//aep i-keyboard_arrow_down
            break;
        }
        let img = false;
        if(cp.AgregaunaImagen){
            img = `https://tupale.co/milfs/images/secure/?file=full/${cp.AgregaunaImagen}`
        }
        this.setState({
            image: img,
            titulo: titulo,
            autor: cp.Autor,
            text: text,
            classAep:classAep
        })
        Contenido.removeChangeListener(this.loadContent.bind(this))
        AgendaStore.removeChangeListener(this.loadContent.bind(this))
        Comentarios.removeChangeListener(this.loadContent.bind(this))
        Recursos.removeChangeListener(this.loadContent.bind(this))
    }
    componentWillMount(id) {
        this.loadContent(id)
    }
    updateData() {
        this.setState({
            postRelation:RelacionesPost.getRposts()
        })
        RelacionesPost.removeChangeListener(this.updateData.bind(this))
    }
    componentDidMount(){

        RelacionesPost.addChangeListener(this.updateData.bind(this))
        Contenido.addChangeListener(this.loadContent.bind(this))
        AgendaStore.addChangeListener(this.loadContent.bind(this))
        Comentarios.addChangeListener(this.loadContent.bind(this))
        Recursos.addChangeListener(this.loadContent.bind(this))
        // document.querySelector(".Descripcion").innerHTML = this.state.text
    }
    showMore(){
        this.setState({
            classAep: "Descripcion"
        })
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
            <article className="Detalle flex-container column">
            <div className="colum">
            <h1 className="Titulo" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.titulo)}></h1>
            <div className={this.state.classAep} onClick={this.showMore.bind(this)}  dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.text)}></div>

            </div>
            <div id="relacionesPost" className="relatedPosts flex" onClick={this.loadContentAux.bind(this)}>
            {
                this.state.postRelation.map(item => {
                    return(
                        <Post key={ item.identificador } data={item}  url="contenido/" tipo="1"/>
                    )
                })
            }
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
//dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.renderPost(this.state.postRelation))}
