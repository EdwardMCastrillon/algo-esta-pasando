import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'

import InitStore from '../stores/initStore'

if (process.env.BROWSER) {
    require("../style/Posts.scss");
}
export default class Inicio extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts: InitStore.getPosts(),
            info: 'nada nada',
            classNameArticle: 'hiden',
            classNamePost: 'P-B-Post post'
        })
    }
    componentWillUnmount() {
        InitStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        InitStore.init();
    }
    updateData() {
        this.setState({
            posts:InitStore.getPosts()
        })
    }
    componentDidMount(){
        InitStore.addChangeListener(this.updateData.bind(this))
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        return (
            <div className="P-B-ContentPost" style={divStyle}>
                <section className="P-B-Post post" >
                    {
                        this.state.posts.map(item => {
                            return(
                                <Post key={ item.identificador } data={item} tipo="0"/>
                            )
                        })
                    }
                </section>
                 {this.props.children}
            </div>
        )
    }
}
