import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Filters from '../components/filters'
import contenidoStore from '../providers/contenidoStore'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts:contenidoStore.getContenidos(),
            search:false
        })
    }
    componentWillUnmount() {
        contenidoStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        contenidoStore.init(118)
    }
    updateData() {
        this.setState({
            posts:contenidoStore.getContenidos()
        })
    }
    componentDidMount(){
        contenidoStore.addChangeListener(this.updateData.bind(this))
    }
    componentDidUpdate(){
        // if(parseInt(document.querySelector(".autor").value) !== 0){
        //     document.querySelector(".autor").value = 0
        //     this.setState({
        //         posts:contenidoStore.getContenidos()
        //     })
        // }
    }
    renderFilter(obj,autor){
        console.log(obj.length);
        if(obj.length > 0){
            this.setState({
                posts:obj,
                search:true
            })
        }else{
            this.setState({
                posts:contenidoStore.getContenidos(),
                search:false
            })
        }
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return (
                <div className="P-B-ContentPost" style={divStyle}>
                    <Filters renderFilter={this.renderFilter.bind(this)} />
                    <section className="P-B-Post post">
                        {
                            this.state.posts.map(item => {
                                let origen = ''
                                let tipo = 1;
                                if(item.origen == "Perfiles"){
                                    tipo = 2;
                                }
                                return(
                                    <Post key={ item.identificador } data={item} search={this.state.search} url="contenido/" tipo={tipo}/>
                                )
                            })
                        }
                    </section>
                </div>
            )
        }else{

            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <Filters renderFilter={this.renderFilter.bind(this)} />
                    <h1> Cargando Datos.. </h1>
                </div>
            )
        }

    }
}
