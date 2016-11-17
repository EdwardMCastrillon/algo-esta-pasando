import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import RecursoStore from '../providers/recursoStore'
import Filters from '../components/filters'
import FunctExtra from '../utils/functExtra'
import Loader from '../components/loader'
import '../style/Posts.scss'
import Footer from '../components/footer'
export default class Recursos extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts: RecursoStore.getRecursos(),
            search:false
        })
    }
    componentWillUnmount() {
        RecursoStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        RecursoStore.init()
    }
    componentDidUpdate(){
        // console.log(document.querySelector(".autor"));
        // if(parseInt(document.querySelector(".autor").value )!== 0){
        //     document.querySelector(".autor").value = 0
        //     this.setState({
        //         posts:RecursoStore.getRecursos()
        //     })
        // }
    }
    updateData() {
        this.setState({
            posts:RecursoStore.getRecursos()
        })
    }
    componentDidMount(){
        RecursoStore.addChangeListener(this.updateData.bind(this))
        FunctExtra.showFilters()
    }
    renderFilter(obj,autor){
        if(obj.length == 0){
            this.setState({
                posts:RecursoStore.getRecursos()
            })
        }else{
            this.setState({
                posts:obj,
                search:true
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
                    <section className="P-B-Post post">
                        {
                            this.state.posts.map(item => {
                                let origen = ''
                                let tipo = 1;
                                if(item.origen == "Perfiles"){
                                    tipo = 2;
                                }
                                return(
                                    <Post key={ item.identificador }  search={this.state.search}  url="centro_de_recursos/" data={item} tipo={tipo}/>
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
