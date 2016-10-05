import React from 'react'
import FunctExtra from '../utils/functExtra'
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

        let t = perfil['CuentadeTwitter'];
        let twitter = (t)?t.replace("https://twitter.com/","@"):'';
        twitter = (t)?t.replace("@",""):'';
        twitter = `https://twitter.com/${twitter}`

        this.setState({
            name: FunctExtra.accentDecode(perfil['Nombres']+ " "+perfil['Apellidos']),
            img: perfil['AgregaunaImagen'],
            description: FunctExtra.accentDecode(perfil['Perfil']),
            twitter:twitter
        })
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

        return (
            <section className="showContent autor"  style={heightStyle}>
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
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                    <div className="postsRelated"></div>
                </div>
            </section>
        )
    }
}
