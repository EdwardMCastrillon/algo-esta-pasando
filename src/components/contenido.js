import React from 'react'
import { hashHistory } from 'react-router'
import request from 'superagent'
import Post from './posts'

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            data: [],
            items:[]
        })

    }
    getData(){
        let selt = this
        request
        .post('https://tupale.co/milfs/api.php?id=118&tipo=simple')
        .end(function(err, res){
            selt.setState({
                data:res.body
            })
        });
    }
    componentWillMount(){
        console.log("componentWillMount")
    }
    componentDidMount(){
        console.log("componentDidMount")
        this.getData()
    }
    render () {

        return (
            <section className="P-B-Post">
                {
                    this.state.data.map(item => {
                        return(
                            <Post key={ item.identificador } data={item} tipo="1"/>
                        )
                    })
                }
            </section>
        )
    }
}
