/**
 * Created by luthfi on 12/16/16.
 */
import React from 'react'

export default class Content extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section id="content">
                {this.props.children}
            </section>
        );
    }
};