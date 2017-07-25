/**
 * Created by luthfi on 12/20/16.
 */
import React from 'react'
import { IndexLink } from "react-router";
import {connect} from 'react-redux'

@connect((store) => {
    return {
        isAuthenticated: store.account.isAuthenticated
    };
})
export default class Auth extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $('body')
            .addClass('bg-info dker')
            .css('overflow-y', 'scroll');
    }

    componentWillUnmount() {
        $('body')
            .removeClass('bg-info dker')
            .css('overflow-y', '');
    }

    render() {
        return (
            <section id="content" className="m-t-lg wrapper-md animated fadeInUp">
                <div className="container aside-xl">
                    <div className="logo-auth">
                        <img src="assets/images/logo.png" alt=""/>
                    </div>
                    <IndexLink to="/" className="navbar-brand block hidden-xs">
                        <span className="h1 font-bold">Svara Web Player</span>
                    </IndexLink>
                    {this.props.children}
                </div>
            </section>
        );
    }   
}