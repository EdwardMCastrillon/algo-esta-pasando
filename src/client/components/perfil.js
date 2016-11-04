import React from 'react'
import Comentarios from '../providers/comentarioStore'
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
    up(idP){
        this.loadPerfile(idP)
    }
    down(idP){
        this.loadPerfile(idP)
    }
    rlAutor(name){
        RelacionAutor.init(name)
    }
    loadPerfile(id){
        console.log("loadPerfile  ",id);
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
        let urlLeft = `/autores/${perfil.prev}`

        let urlRight = `/autores/${perfil.next}`
        this.setState({
            name: name,
            img: perfil['AgregaunaImagen'],
            description: FunctExtra.accentDecode(perfil['Perfil']),
            twitter:twitter,
            urlLeft:urlLeft,
            urlRight:urlRight,
            maxId:perfil['maxId'],
            prev:perfil.prev,
            next:perfil.next
        })
    }
    componentWillMount() {
        this.loadPerfile()
        Comentarios.init()
    }
    componentDidMount(){
        this.setState({
            height: document.querySelector(".figure").offsetWidth
        })
        this.heightImgResize()
        RelacionAutor.addChangeListener(this.updateData.bind(this))
    }
    componentWillUnmount() {
        RelacionAutor.removeChangeListener(this.updateData.bind(this))
    }
    updateData() {
        this.setState({
            relacion:RelacionAutor.getRAutores()
        })
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
                    <Link to={this.state.urlLeft} onClick={this.down.bind(this,this.state.prev)}><i className="i-arrow_left"></i></Link>
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
                    <span className="artAutor">Artículos del autor</span>
                    <div className="relatedPosts flex">
                        {
                            this.state.relacion.map(item => {
                                let url;
                                switch (item.origen) {
                                    case 'Agenda':
                                        url="";
                                    break;
                                    case 'Recursos':
                                        url="centro_de_recursos/";
                                    break;
                                    case 'Contenidos':
                                        url="contenido/";
                                    break;
                                    case 'Comentarios':
                                        url="comentarios/";
                                    break;

                                }
                                return(
                                    <Post key={ item.identificador } data={ item } url={url} tipo={1} />
                                )
                            })
                        }
                    </div>

                </div>
                <div className="arrow_right align-center">
                    <Link to={this.state.urlRight} onClick={this.up.bind(this,this.state.next)}><i className="i-arrow_right"></i></Link>
                </div>
            </section>
        )
    }
}
