import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Editiorial from '../providers/editorialStore'

export default class Editorial extends React.Component {
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
                                    <Post key={ item.identificador } data={item} url="editorial/" tipo="1"/>
                                )
                            })
                        }
                    </section>
                </div>
            )
        }else{

            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <h1> Cargando Datos.. </h1>
                </div>
            )
        }

    }
}
