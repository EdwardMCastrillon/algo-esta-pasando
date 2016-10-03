import React from 'react'
import utf from '../utils/accentDecode'
import PerfilStore from '../providers/perfilStore'

export default class Perfil extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            image: '',
            titulo: ''
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
    componentWillMount() {
        let perfil = PerfilStore.getPerfil(this.props.params.id);

        this.setState({
            name: perfil['Nombres']+ " "+perfil['Apellidos'],
            img: perfil['Agrega una Imagen'],
            description: perfil['Perfil']
        })
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
        this.setState({
            height: document.querySelector(".figure").offsetWidth
        })
        document.querySelector(".showContent").style.left = "0px"
        this.heightImgResize()
    }


    render () {
        let heightStyle = {
            height: window.innerHeight - 50,
        };
        let figure = {
            height:this.state.height,
            background: `url("https://tupale.co/milfs/images/secure/?file=600/${this.state.img}") center center / cover rgb(234, 234, 234)`,
        };
        let id = this.props.params.id
        return (
            <section className="showContent autor"  style={heightStyle}>
                <div className="contentAutor flex justify-space-between">
                    <div className="figure" style={figure}></div>
                    <div className="descriptionAutor flex wrap align-content-center">
                        <span className="nameAutor">{this.state.name}</span>
                        {this.state.description}
                    </div>
                </div>
                <div className="relatedPosts flex">
                    <span>Artículos del autor</span>
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                </div>
            </section>
        )
    }
}
