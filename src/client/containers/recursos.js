import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import PerfilStore from '../providers/recursoStore'

export default class Recursos extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts: PerfilStore.getRecurso()
        })
    }
    componentWillUnmount() {
        PerfilStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        PerfilStore.init(211)
    }
    updateData() {
        this.setState({
            posts:PerfilStore.getRecurso()
        })
    }
    componentDidMount(){
        PerfilStore.addChangeListener(this.updateData.bind(this))
        // this.getData()
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
