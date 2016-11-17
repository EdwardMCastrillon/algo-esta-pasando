//conenido1.js y contenido.js es el mismo componecte mejorar esto!!!
import React from 'react'
import FunctExtra from '../utils/functExtra'
import Search from '../providers/search'
import Letrequest from '../providers/request'
import PerfilStore from '../providers/perfilStore'
import Loader from './loader'
import Footer from '../components/footer'
export default class PostContenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: false,
            titulo: '',
            postRelation: [],
            text:'',
            Wautor:'',
            HtmlAgenda:'',
            classContent:"flex c_c_d"
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
        // // Se captura el id del post que llega como parametro en la ruta
        let p;
        p = this.props.params.id;
        let cp,text,titulo,classAep,postRelation={},textCompleto;
        classAep = "Descripcion "

        cp = Letrequest.getletReguest();

        if(cp["Escribir / Párrafos / Texto"]){
            text = cp["Escribir / Párrafos / Texto"];
        }else{
            text = cp["Escribir/Párrafos/Texto"];
        }
        titulo = cp.Título

        let img = false;
        if(cp.AgregaunaImagen){
            img = `https://tupale.co/milfs/images/secure/?file=full/${cp.AgregaunaImagen}`
        }

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
    }
    componentWillUnmount() {
        Letrequest.removeChangeListener(this.loadContent.bind(this))
    }
    componentWillMount(id) {
        Letrequest.init('editorial_api_url');
    }

    componentDidMount(){
        Letrequest.addChangeListener(this.loadContent.bind(this))
        let autor = PerfilStore.getPerfilName(this.state.autor);
        if(autor){
            this.setState({
                Wautor: <AutorRelation loadContent={this.loadContent.bind(this)} autor={autor} fecha={this.state.fecha} tags={this.state.tags}/>
        })
    }
    FunctExtra.showFilters()
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
    if(this.state.text !== ''){
        return (
            <section className="showContent Post"  style={divStyle}>
                {figure}
                <div className="FlechaIzquierda"></div>
                <div className="FlechaDerecha"></div>

                <article className="Detalle flex-container column">
                    <div className="colum flex">
                        <div className="C_content">
                            <h1 className="Titulo" dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.titulo)}></h1>
                            <div className={this.state.classContent}>
                                <div className={this.state.classAep} onClick={this.showMore.bind(this)}  dangerouslySetInnerHTML={FunctExtra.createMarkup(this,this.state.text)}></div>
                                {this.state.Wautor}
                            </div>
                        </div>
                    </div>
                </article>
                <Footer></Footer>
            </section>
        )
    }else{
        return(
                            <Loader/>
        )
    }
}
}

const HtmlAgenda = ({obj}) =>{
    return(
        <div className="flex column content-from">
            <div className="form-agenda">
                <span>Organizadores del evento:</span>
                <span>{obj['Organizadoresdelevento']}</span>
            </div>
            <div className="form-agenda">
                <span>Formato de la actividad:</span>
                <span>{obj['Formatodelaactividad']}</span>
            </div>
            <div className="form-agenda">
                <span>Lugar del evento:</span>
                <span>{obj['Lugardelevento']}</span>
            </div>
            <div className="form-agenda">
                <span>Fecha:</span>
                <span>{obj['Fecha']}</span>
            </div>
            <div className="form-agenda">
                <span>Hora de inicio:</span>
                <span>{obj['Horadeinicio']} - {obj['Horadefinalización']}</span>
            </div>
            <div className="form-agenda">
                <span>Dirección:</span>
                <span>{obj['Dirección']}</span>
            </div>
            <div className="form-agenda">
                <span>Correo Electrónico:</span>
                <span>{obj['CorreoElectrónico']}</span>
            </div>

            <div className="form-agenda">
                <span>Teléfono:</span>
                <span>{obj['Teléfono']}</span>
            </div>
            <div className="form-agenda">
                <span>Celular:</span>
                <span>{obj['Celular']}</span>
            </div>

        </div>
    )
}
const AutorRelation =({autor,tags,fecha,loadContent}) =>(
    <div className="c_AutorRelations">
        <WidgetPerfilContent autor={autor} fecha={fecha} tags={tags} loadContent={loadContent}/>
    </div>
)
const ImgPost = ({ background }) => (
    <figure className="Figure" style={background}></figure>
);
