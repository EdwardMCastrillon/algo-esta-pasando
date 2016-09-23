import React from 'react'
import utf from '../utils/accentDecode'


export default class Post extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        let id = this.props.params.id;
        return (
            <article >
                {id}
            </article>
        )
    }
}
