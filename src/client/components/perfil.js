import React from 'react'
import FunctExtra from '../utils/functExtra'
import PerfilStore from '../providers/perfilStore'
import RelacionAutor from '../providers/relacionAutor'
import Post from './posts'

import { Link } from 'react-router'


export default class Perfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: '',
            relacion:[]
        }
    }
    heightImgResize(){

        let self = this
        window.addEventListener('resize', function(event){
            if(document.querySelector(".figure")){
                self.setState({
                    height: document.querySelector(".figure").offsetWidth
                })
            }
        });
    }
    up(idP,event){
        let id = parseInt(idP)+1
        if(this.state.maxId < id){
            id = 1;
        }
        this.loadPerfile(id,event)
    }
    down(idP,event){
        let id = parseInt(idP)-1;
        if(id == 0){
            id = this.state.maxId
        }
        this.loadPerfile(id,event)
    }
    rlAutor(name){
        RelacionAutor.init(name)
    }
    loadPerfile(id){
        this.setState({
            relacion:[]
        })
        let p;
        if(id){
            p = id
        }else{
            p = this.props.params.id;
        }
        let perfil = PerfilStore.getPerfil(p);
        let name = FunctExtra.accentDecode(perfil['Nombres']+ " "+perfil['Apellidos'])
        this.rlAutor(name);

        let t = perfil['CuentadeTwitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        twitter = (t)?t.replace("@",""):'';
        twitter = `https://twitter.com/${twitter}`
        let urlLeft = `/autor/${perfil.keyId - 1}`
        if(perfil.keyId - 1 == 0){
            urlLeft = `/autor/${perfil.maxId}`
        }
        let urlRight = `/autor/${perfil.keyId + 1}`
        if(perfil.keyId + 1 > perfil.maxId){
            urlRight = '/autor/1'
        }
        this.setState({
            name: name,
            img: perfil['AgregaunaImagen'],
            description: FunctExtra.accentDecode(perfil['Perfil']),
            twitter:twitter,
            urlLeft:urlLeft,
            urlRight:urlRight,
            maxId:perfil['maxId']
        })
    }
    componentWillMount() {
        this.loadPerfile()
    }
    componentDidMount(){
        this.setState({
            height: document.querySelector(".figure").offsetWidth
        })
        document.querySelector(".showContent").style.left = "0px"
        this.heightImgResize()
        RelacionAutor.addChangeListener(this.updateData.bind(this))
    }
    updateData() {
        this.setState({
            relacion:RelacionAutor.getRAutores()
        })
        console.log(this.state.relacion)
    }
    p(){
        console.log("prueba click");
    }
    render () {
        let heightStyle = {
            height: window.innerHeight - 50,
        };
        let figure = {
            height:this.state.height,
            background: `url("https://tupale.co/milfs/images/secure/?file=600/${this.state.img}") center center / cover rgb(234, 234, 234)`,
        };

        return (
            <section className="showContent autor flex"  style={heightStyle}>
                <div className="arrow_left align-center ">
                    <Link to={this.state.urlLeft} onClick={this.down.bind(this,this.props.params.id)}><i className="i-arrow_left"></i></Link>
                </div>
                <div className="contentInfoAutor">
                    <div className="contentAutor flex justify-space-between">
                        <div className="figure" style={figure}></div>
                        <div className="descriptionAutor flex wrap align-content-center">
                            <span className="nameAutor">{this.state.name}</span>
                            {this.state.description}
                        </div>
                        <div className="rS">
                            <a href={this.state.twitter}  target="_blank">
                                <i className="i-twitter"></i>
                            </a>
                            <i className="i-mail"></i>
                        </div>
                    </div>

                    <div className="relatedPosts flex">
                        <span>Artículos del autor</span>
                        {
                            this.state.relacion.map(item => {
                                return(
                                    <Post key={ item.identificador } data={ item } tipo={1} />
                                )

                            })
                        }
                    </div>

                </div>
                <div className="arrow_right align-center">
                    <Link to={this.state.urlRight} onClick={this.up.bind(this,this.props.params.id)}><i className="i-arrow_right"></i></Link>
                </div>
            </section>
        )
    }
}



// Agrega una Imagen : "5677c158311b3e424336d684bd4c2ff3.jpg"
// Autor : "Gloria Estrada"
// Escribir / Párrafos / Texto : "Juliana, nos gusta que est&aacute;s haciendo varias piezas alrededor del tema. Cada una se sostiene por s&iacute; sola y ayuda en la construcci&oacute;n de las otras: ya tenemos los antecedentes de la experiencia y una especie de ensayo que deja ver una posici&oacute;n muy clara y un punto de vista personal y reflexivo sobre la programaci&oacute;n. Nos gustar&iacute;a que nos compartieras un poco de la estructura que tienes pensada y conocer c&oacute;mo piensas darle cierre al conjunto de piezas, de pronto una especie de panorama final, tipo conclusi&oacute;n, o quiz&aacute;s algo que redondee el contenido. Bueno, seguimos en contacto y va un saludo."
// Etiquetas : "Ciudad, Encuentro con otros"
// Georreferencia (mapa) : "-75.6101619 6.2613861 16"
// Imaginarios de paz : "Igualdad"
// Título :"Ingeniero Wannabe - Wannabe Programador "
