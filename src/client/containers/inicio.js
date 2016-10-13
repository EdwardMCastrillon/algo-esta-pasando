import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'

import HomeProvider from '../providers/homeProvider'
import '../style/Posts.scss'

export default class Inicio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: HomeProvider.getHomes()
        }
    }
    componentWillUnmount() {
        HomeProvider.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        HomeProvider.init()
    }
    updateData() {
        this.setState({
            posts:HomeProvider.getHomes()
        })
    }
    componentDidMount(){
        HomeProvider.addChangeListener(this.updateData.bind(this))
    }
    render () {
        let divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <section className="P-B-Post post" >
                        {
                            this.state.posts.map((post) => {
                                return <Post key={ post.identificador } data={ post } url='post/' tipo={0} />
                            })
                        }
                    </section>
                </div>
            )
        } else {
            return(
                <div className="P-B-ContentPost" style={divStyle}>
                    <h1> Cargando Datos.. </h1>
                </div>
            )
        }
    }
}
