import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import RecursoStore from '../providers/recursoStore'
import Filters from '../components/filters'
import '../style/Posts.scss'
export default class Recursos extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts: RecursoStore.getRecursos()
        })
    }
    componentWillUnmount() {
        RecursoStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        RecursoStore.init()
    }
    updateData() {
        this.setState({
            posts:RecursoStore.getRecursos()
        })
    }
    componentDidMount(){
        RecursoStore.addChangeListener(this.updateData.bind(this))
    }
    renderFilter(obj,autor){
        if(parseInt(autor) == 0){
            this.setState({
                posts:RecursoStore.getRecursos()
            })
        }else{
            this.setState({
                posts:obj
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
                <Filters renderFilter={this.renderFilter.bind(this)} api="Recursos"/>
                <section className="P-B-Post post">
                {
                    this.state.posts.map(item => {
                        return(
                            <Post key={ item.identificador } url="centro_de_recursos/" data={item} tipo="1"/>
                        )
                    })
                }
                </section>
                </div>
            )
        }else{
            return(
                <div className="P-B-ContentPost" style={divStyle}>
                <Filters renderFilter={this.renderFilter.bind(this)} api="Recursos"/>
                <h1> Cargando Datos.. </h1>
                </div>
            )
        }
    }
}
