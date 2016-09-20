import React from 'react'
import { hashHistory } from 'react-router'
// import request from 'superagent'
import Post from './posts'

import ContactStore from '../stored'

if (process.env.BROWSER) {
    require("../style/Posts.scss");
}
export default class Inicio extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts: ContactStore.getPosts()
        })
    }
    updateprueba(){
        console.log("updateprueba");
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
        console.log("cuando se desmonta ")
        ContactStore.removeChangeListener(this.updateData.bind(this))
    }

    componentWillMount(){
        ContactStore.init(111)
        // console.log("componentWillMount")
    }

    updateData() {
        this.setState({
            posts:ContactStore.getPosts()
        })
    }
    componentDidMount(){
        console.log("componentDidMount")
        ContactStore.addChangeListener(this.updateData.bind(this))
        // this.getData()
    }
    render () {
        return (
            <section className="P-B-Post">
                {
                    this.state.posts.map(item => {
                        return(
                            <Post key={ item.identificador } data={item} tipo="0"/>
                        )
                    })
                }
            </section>
        )
    }
}
