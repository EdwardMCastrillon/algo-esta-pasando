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
            posts: InitStore.getPosts()
        })
    }
    // getData(){
    //     let selt = this
    //     request
    //     .get('https://tupale.co/milfs/api.php?id=111&tipo=simple')
    //     .end(function(err, res){
    //         console.log("llama");
    //         selt.setState({
    //             posts:res.body
    //         })
    //     });
    // }

    componentWillUnmount() {
        InitStore.removeChangeListener(this.updateData.bind(this))
    }

    componentWillMount(){
        InitStore.init()
        // console.log("componentWillMount")
    }

    updateData() {
        this.setState({
            posts:InitStore.getPosts()
        })
    }
    componentDidMount(){
        InitStore.addChangeListener(this.updateData.bind(this))
        // this.getData()
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        return (
            <div className="P-B-ContentPost" style={divStyle}>
            <section className="P-B-Post post">
                {
                    this.state.posts.map(item => {
                        return(
                            <Post key={ item.identificador } data={item} tipo="0"/>
                        )
                    })
                }
            </section>
        </div>
        )
    }
}
