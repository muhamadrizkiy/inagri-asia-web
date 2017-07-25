/**
 * Created by muhamadrizki on 24/07/17.
 */


import React from 'react'
import { Link } from "react-router"
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { loginUser } from '../../actions/accounts/login-actions'
import Preloader from './preloader'

@connect((store) => {
    return {
        isAuthenticated: store.account.isAuthenticated
    };
})
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const {isAuthenticated, dispatch} = this.props;

        const self = this;

        this.setState({
            isLoading: true
        });

        let credential = {};
        if (this.validateEmail(username))
            credential.email = username;
        else
            credential.username = username;

        credential.password = password;

        dispatch(loginUser(credential)).then(() => {
            if (isAuthenticated)
                hashHistory.push('/')
        }).catch((error) => {
            self.setState({
                isLoading: false,
                error: error
            })
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render() {
        const { isAuthenticated } = this.props;
        const { isLoading, error } = this.state;
        let errorMessage = '';
        if (error)
            errorMessage = error.message;

        if (isAuthenticated)
            hashHistory.push('/');
        if (isLoading) {
            return (
                <Preloader/>
            );
        }
        return (
            <section className="m-b-lg">
                <header className="wrapper text-center">
                    <strong>Sign in to get in touch</strong>
                </header>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input name="username" type="text" placeholder="Email/Username" className="form-control rounded input-lg text-center no-border" />
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" placeholder="Password" className="form-control rounded input-lg text-center no-border" />
                    </div>
                    <div className="text-center m-t m-b"><small>{errorMessage}</small></div>
                    <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded"><i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign in</span></button>
                    <div className="text-center m-t m-b"><a href="#"><small>Forgot password?</small></a></div>
                    <div className="line line-dashed"></div>
                    <p className="text-muted text-center"><small>Do not have an account?</small></p>
                    <Link to="auth/signup" className="btn btn-lg btn-info btn-block rounded">Create an account</Link>
                </form>
            </section>
        );
    }
}