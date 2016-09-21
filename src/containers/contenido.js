import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import ContactStore from '../stores/initStore'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            // posts: ContactStore.getPosts()
            posts:[]
        })

    }
    // getData(){
    //     let selt = this
    //     request
    //     .post('https://tupale.co/milfs/api.php?id=118&tipo=simple')
    //     .end(function(err, res){
    //         selt.setState({
    //             data:res.body
    //         })
    //     });
    // }
    componentWillUnmount() {
        ContactStore.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        console.log(this.props.route.id);
        ContactStore.init(118)
    }
    updateData() {
        this.setState({
            posts:ContactStore.getPosts()
        })
    }
    componentDidMount(){
        ContactStore.addChangeListener(this.updateData.bind(this))
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
