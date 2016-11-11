import React from 'react'
import { hashHistory } from 'react-router'
import Post from '../components/posts'
import Edicion from '../constants/edicion'
import FunctExtra from '../utils/functExtra'
import Loader from '../components/loader'
export default class Ediciones extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            posts:Edicion.getEdiciones()
        })
    }
    componentWillUnmount() {
        Edicion.removeChangeListener(this.updateData.bind(this))
    }
    componentWillMount(){
        Edicion.init()
    }
    updateData() {
        this.setState({
            posts:Edicion.getEdiciones()
        })
    }
    componentDidMount(){
        Edicion.addChangeListener(this.updateData.bind(this))
        // this.getData()
        FunctExtra.showFilters()
    }
    changeEdition(id,name){
        localStorage.setItem("edicion",id)
        localStorage.setItem("nameEdicion",name)
        window.location.href = "/"
    }
    render () {
        var divStyle = {
            height: window.innerHeight - 50
        };
        if (this.state.posts.length > 0) {
            return (
                <div className="P-B-ContentPost edicion" style={divStyle}>
                    <section className="P-B-Post ">
                        {
                            this.state.posts.map(item => {
                                let img = '';
                                if(item['logoOpen']){
                                    img = item['logoOpen']
                                }
                                let figure = ''
                                let classFigure = "targetPost noInmg"
                                let back = {
                                    background:item.coloritemgrid
                                }
                                let b = {
                                    background:item.coloritemgrid
                                }
                                if(img != ''){
                                    classFigure = "targetPost "
                                    back = {}
                                    figure = <Imgfigure background={img} />
                                    // figure = <Imgfigure background={`https://tupale.co/milfs/images/secure/?file=600/${img}`} />
                                }
                                return(
                                    <div onClick={this.changeEdition.bind(this,item.EDNUMERO,item.Título)}>
                                            <figure className={classFigure} style={back}>
                                                {figure}
                                                <div style={b} className="tP_description">
                                                <i className="plus i-plus"></i>
                                                    <span className="titulo">{item.Título}</span>
                                                    <span className="description">{item.Resumen.substring(0, 150)}...</span>
                                                </div>
                                            </figure>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
            )
        }else{

            return(
                                <Loader/>
            )
        }

    }
}
const Imgfigure = ({ background }) => (
    <img src={background}/>
);
