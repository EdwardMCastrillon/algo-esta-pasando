import React from 'react'
import { hashHistory } from 'react-router'
import { Map, MarkerGroup } from 'react-d3-map'
var topojson = require('topojson');

export default class Contenido extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount(){

    }
    componentDidMount(){

    }
    popupContent(d) { return d.properties.text; }
    render () {
        var data = {
            "type": "Feature",
            "properties": {
                "text": "this is a Point!!!"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [122, 23.5]
            }
        }

        var width = 700;
        var height = 700;
        // set your zoom scale
        var scale = 1200 * 5;
        // min and max of your zoom scale
        var scaleExtent = [1 << 12, 1 << 13]
        // set your center point
        var center = [122, 23.5];
        // set your popupContent


        return(
            <div className="P-B-ContentPost">

            </div>
        )
    }
}
/*
<Map width= {width} height= {height} scale= {scale} scaleExtent= {scaleExtent} center= {center} >
    <MarkerGroup key= {"polygon-test"}
        data= {data}
        popupContent= {this.popupContent.bind(this)}
        markerClass= {"your-marker-css-class"} />
</Map>
*/
