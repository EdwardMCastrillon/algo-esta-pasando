import React from 'react'
import { hashHistory } from 'react-router'
import request from 'superagent'
import Post from './post'



if (process.env.BROWSER) {
    require("../style/Posts.scss");
}
export default class Inicio extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
             data: [],
             items:[] ,
             color:["#F44336" ,"#E91E63" ,"#9C27B0" ,"#673AB7" ,"#3F51B5" ,"#2196F3" ,"#03A9F4" ,"#00BCD4", "#009688"]
         })

    }
    getData(){
        let selt = this
        request
        .post('https://tupale.co/milfs/api.php?id=111&tipo=simple')
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
                            <Post key={ item.identificador } data={item}/>
                        )
                    })
                }
            </section>
        )
    }
}
// {
//     this.state.data.map(item => {
//         return(
//             <Post key={ item.identificador } data={item}/>
//         )
//     })
// }

// Inicio.propTypes = {
//
// }
