import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Editiorial from '../providers/editorialStore'
import FunctExtra from '../utils/functExtra'
import Loader from '../components/loader'
import Footer from '../components/footer'
export default class Sobre_algo_esta_pasando extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            editorial: Editiorial.getEditorials()
        })

    }
    componentWillMount(){
        Editiorial.init();
    }
    updateEditorial(){
        this.setState({
            editorial: Editiorial.getEditorials()
        })
    }
    componentWillUnmount() {
        Editiorial.removeChangeListener(this.updateEditorial.bind(this))
    }
    componentDidMount(){
        Editiorial.addChangeListener(this.updateEditorial.bind(this))
        FunctExtra.showFilters()
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.editorial.length > 0) {
            return (
                <div className="P-B-ContentPost" style={divStyle}>
                    <section className="P-B-Post post">
                        {
                            this.state.editorial.map(item => {
                                return(
                                    <Post key={ item.identificador } data={item} url="sobre_algo_esta_pasando/" tipo="1"/>
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
