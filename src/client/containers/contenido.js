import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import contenidoStore from '../providers/contenidoStore'
import FunctExtra from '../utils/functExtra'
import Loader from '../components/loader'
import Footer from '../components/footer'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts:contenidoStore.getContenidos(),
            search:false,
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
        FunctExtra.showFilters()
    }
    componentDidUpdate(){
        // if(parseInt(document.querySelector(".autor").value) !== 0){
        //     document.querySelector(".autor").value = 0
        //     this.setState({
        //         posts:contenidoStore.getContenidos()
        //     })
        // }
    }

    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return (
                <div className="P-B-ContentPost" style={divStyle}>
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
                    <Footer></Footer>
                </div>
            )
        }else{

            return(
                <Loader/>
            )
        }

    }
}
// <Filters renderFilter={this.renderFilter.bind(this)} />
