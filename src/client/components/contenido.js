//conenido1.js y contenido.js es el mismo componecte mejorar esto!!!
import React from 'react'
import FunctExtra from '../utils/functExtra'
import Contenido from '../providers/contenidoStore'
import Comentarios from '../providers/comentarioStore'
import Recursos from '../providers/recursoStore'
import Aep from '../providers/aep'
import AgendaStore from '../providers/agendaStore'
import RelacionesPost from '../providers/relacionesPost'
import Editiorial from '../providers/editorialStore'
import Search from '../providers/search'
import Post from '../components/posts'
import PerfilStore from '../providers/perfilStore'
import WidgetPerfilContent from './widgetPerfilContent'

export default class PostContenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: false,
            titulo: '',
            postRelation: [],
            text:'',
            Wautor:''
        }
    }
    loadContentAux(){
        // para poder pintar contenido en el mismo componente
        let self = this;
        setTimeout(function(){
            self.loadContent()
        },300)
    }
    loadContent(){
        console.log("loadContent");
        // // Se captura el id del post que llega como parametro en la ruta

        let p;
        p = this.props.params.id;
        let cp,text,titulo,classAep,postRelation={},textCompleto;
        classAep = "Descripcion "
        let l = this.props.route.path.replace("/","").replace("/","").replace(":id","")
        if(this.props.location.hash !== ""){
            l = this.props.location.hash
        }
        switch (l) {
            case "#search":
            cp = Search.getsearch(p);

            if(cp["Escribir/Párrafos/Texto"]){
                text = cp["Escribir/Párrafos/Texto"];
            }else if(cp["Descripcióndelaactividad"]){
                text = cp["Descripcióndelaactividad"];
            }else{
                text = cp["EDITOR(Recurso)"]
            }
            titulo =  cp.Título
            break
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
            case "editorial":

            cp = Editiorial.getEditorial(p);
            if(!cp){
                Editiorial.init();
                return
            }
            if(cp["Escribir / Párrafos / Texto"]){
                text = cp["Escribir / Párrafos / Texto"];
            }else{
                text = cp["Escribir/Párrafos/Texto"];
            }
            titulo =  cp.Título
            break;
            case "aep":
            case "aep_":
            cp = Aep.getAeP(p);
            textCompleto = cp["EDITOR(Recurso)"];
            text = cp.Resumen;
            titulo =  cp.Título
            RelacionesPost.init(titulo);
            classAep += " aep "
            break;
        }
        let img = false;
        if(cp.AgregaunaImagen){
            img = `https://tupale.co/milfs/images/secure/?file=full/${cp.AgregaunaImagen}`
        }
        console.log(cp);
        let tags = ''
        if(cp['Otrasetiquetas']){
            tags = cp['Otrasetiquetas']
        }
        this.setState({
            image: img,
            titulo: titulo,
            autor: cp.Autor,
            tags:tags,
            fecha:cp.timestamp,
            text: text,
            textCompleto:textCompleto,
            classAep:classAep
        })
        Editiorial.removeChangeListener(this.loadContent.bind(this))
        Contenido.removeChangeListener(this.loadContent.bind(this))
        AgendaStore.removeChangeListener(this.loadContent.bind(this))
        Comentarios.removeChangeListener(this.loadContent.bind(this))
        Recursos.removeChangeListener(this.loadContent.bind(this))
    }
    componentWillMount(id) {
        this.loadContent(id)
    }
    componentDidUpdate(){
        // console.log("componentDidUpdate");
        // if(!document.querySelector(".c_AutorRelations")){
        //     document.querySelector(".Descripcion").style.width = "100%"
        // }
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
        Editiorial.addChangeListener(this.loadContent.bind(this))

        let autor = PerfilStore.getPerfilName(this.state.autor);
        if(autor){
            this.setState({
                Wautor: <AutorRelation loadContent={this.loadContent.bind(this)} autor={autor} fecha={this.state.fecha} tags={this.state.tags}/>
            })
        }

    }
    showMore(){
        if(document.querySelector(".aep")){
            this.setState({
                classAep: "Descripcion",
                text: this.state.textCompleto
            })
        }
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

                <article className="Detalle flex-container column">
                    <div className="colum flex">
                        <div className="C_content">
                            <h1 className="Titulo" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.titulo)}></h1>
                            <div className="flex c_c_d">
                                <div className={this.state.classAep} onClick={this.showMore.bind(this)}  dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.text)}></div>
                                {this.state.Wautor}
                            </div>
                        </div>
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
const AutorRelation =({autor,tags,fecha,loadContent}) =>(
    <div className="c_AutorRelations">
        <WidgetPerfilContent autor={autor} fecha={fecha} tags={tags} loadContent={loadContent}/>
    </div>
)
const ImgPost = ({ background }) => (
    <figure className="Figure" style={background}></figure>
);

// <h2 className="Subtitulo">
//     "¿CUÁL SERÁ EL MIEDO A HABLAR?"
//     "¿SERÁ UNA GRAN ANALOGÍA AL MIEDO DE TODOS LOS COLOMBIANOS"
// </h2>
//dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.renderPost(this.state.postRelation))}
// <div className="AutorFoto">
// {this.state.autor}
// </div>
