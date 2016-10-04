import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import RecursoStore from '../providers/recursoStore'

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
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        return (
            <div className="P-B-ContentPost" style={divStyle}>
                <section className="P-B-Post">
                    {
                        this.state.posts.map(item => {
                            return(
                                <Post key={ item.identificador } data={item} tipo="1"/>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}
