import React from 'react'
import Comentarios from '../providers/comentarioStore'
import FunctExtra from '../utils/functExtra'
import PerfilStore from '../providers/perfilStore'
import RelacionAutor from '../providers/relacionAutor'
import Post from './posts'
import Edicion from '../constants/edicion'

import Footer from '../components/footer'
import { Link } from 'react-router'


export default class Perfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: '',
            relacion:[],
            font_grid_titulos:{
                "font-family":Edicion.getEdicion().font_grid_titulos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_grid_resumen:{
                "font-family":Edicion.getEdicion().font_grid_resumen.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_titulos:{
                "font-family":Edicion.getEdicion().font_titulos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            },
            font_parrafos:{
                "font-family":Edicion.getEdicion().font_parrafos.replace(/&quot;/g, '').replace(";","").split(":")[1]
            }
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
        if(!perfil){
            PerfilStore.init()
            PerfilStore.addChangeListener(this.loadPerfile.bind(this))
            return;
        }
        let name = FunctExtra.accentDecode(perfil['Nombres']+ " "+perfil['Apellidos'])
        this.rlAutor(name);

        let t = perfil['CuentadeTwitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        twitter = (t)?t.replace("@",""):'';
        // twitter = `https://twitter.com/${twitter}`
        if(twitter !== "" && twitter){
            twitter = `https://twitter.com/${twitter}`
        }


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
        PerfilStore.removeChangeListener(this.loadPerfile.bind(this))
    }
    updateData() {
        this.setState({
            relacion:RelacionAutor.getRAutores()
        })
    }
    componentDidUpdate(){
        // if(document.querySelector(".contentSearch")){
        //     document.querySelector(".contentSearch").classList.add('active');
        // }
    }
    render () {
        let heightStyle = {
            height: window.innerHeight - 50,
        };
        let figure = {
            height:this.state.height,
            background: `url("https://tupale.co/milfs/images/secure/?file=600/${this.state.img}") center center / cover rgb(234, 234, 234)`,
        };
        let classPointer = ''
        if(this.state.twitter == ''){
            classPointer = "disabled"
        }
        return (
            <section className="showContent autor flex"  style={heightStyle}>
                <div className="arrow_left align-center ">
                    <Link to={this.state.urlLeft} onClick={this.down.bind(this,this.state.prev)}><i className="i-arrow_left"></i></Link>
                </div>
                <div className="contentInfoAutor">
                    <div className="contentAutor flex justify-space-between">
                        <div className="figure" style={figure}></div>
                        <div style={this.state.font_grid_resumen} className="descriptionAutor flex wrap align-content-center">
                            <span className="nameAutor" style={this.state.font_grid_titulos}>{this.state.name}</span>
                            {this.state.description}
                        </div>
                        <div className="rS">
                            <a href={this.state.twitter}  target="_blank" className={classPointer}>
                                <i className="i-twitter"></i>
                            </a>
                        </div>
                    </div>
                    <span className="artAutor" style={this.state.font_titulos}>Artículos del autor</span>
                    <div className="relatedPosts flex">
                        <section className="P-B-Post post">
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
                        </section>

                    </div>

                </div>
                <div className="arrow_right align-center">
                    <Link to={this.state.urlRight} onClick={this.up.bind(this,this.state.next)}><i className="i-arrow_right"></i></Link>
                </div>

            </section>
        )
    }
}
// <Footer></Footer>
