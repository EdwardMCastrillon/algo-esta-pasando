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
        let urlLeft = `/autores/${perfil.keyId - 1}`
        if(perfil.keyId - 1 == 0){
            urlLeft = `/autores/${perfil.maxId}`
        }
        let urlRight = `/autores/${perfil.keyId + 1}`
        if(perfil.keyId + 1 > perfil.maxId){
            urlRight = '/autores/1'
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
        // document.querySelector(".showContent").style.left = "0px"
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
                                        url="";
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
                    <Link to={this.state.urlRight} onClick={this.up.bind(this,this.props.params.id)}><i className="i-arrow_right"></i></Link>
                </div>
            </section>
        )
    }
}
