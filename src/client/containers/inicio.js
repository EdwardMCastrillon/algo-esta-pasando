import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'

import HomeProvider from '../providers/homeProvider'
import '../style/Posts.scss'

export default class Inicio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        HomeProvider.getAllPosts((err, posts) => {
            if (err) console.error(`Error al obtener los posts desde el servidor: ${err}`)
            localStorage.setItem('posts', JSON.stringify(posts))
            this.setState({ posts: posts })
        })
    }

    componentDidMount() {

    }

    // updateData() {
    //     this.setState({
    //         posts: provider.getPosts()
    //     })
    // }

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
                                return <Post key={ post.identificador } data={ post } tipo={0} />
                            })
                        }
                    </section>
                </div>
            )
        } else {
            return(
                <h1> Cargando Datos.. </h1>
            )
        }
    }
}
