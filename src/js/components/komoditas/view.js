/**
 * Created by muhamadrizki on 24/07/17.
 */

import React from 'react'
import { Link, hashHistory } from "react-router"
import { connect } from 'react-redux'
import inagriClient from '../../inagri-client'

@connect((store) => {
    return {
        isAuthenticated: store.account.isAuthenticated
    };
})
export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null,
            success: false,
            account: {
                birthday : '',
                profilePicture : '',
                username : '',
                password : '',
                email : '',
                firstName : '',
                lastName : '',
                gender : '',
                coverImage : '',
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { target } = event;
        const self = this;
        try {
            const account = {
                birthday : new Date(target.birthday.value).toISOString(),
                profilePicture : ' ',
                username : target.username.value,
                password : target.password.value,
                email : target.email.value,
                firstName : target.firstName.value,
                lastName : target.lastName.value,
                gender : target.gender.value,
                coverImage : ' ',
            };
            this.setState({
                isLoading: true,
                account: {
                    birthday : target.birthday.value,
                    profilePicture : ' ',
                    username : target.username.value,
                    password : target.password.value,
                    email : target.email.value,
                    firstName : target.firstName.value,
                    lastName : target.lastName.value,
                    gender : target.gender.value,
                    coverImage : ' ',
                }
            });
            svaraClient.registerAccount(account).then(() => {
                self.setState({
                    isLoading: false,
                    success: true
                })
            }).catch(error => {
                self.setState({
                    isLoading: false,
                    error: error
                })
            })
        } catch (e) {
            self.setState({
                isLoading: false,
                error: e
            })
        }
    }

    render() {
        const { isAuthenticated } = this.props;
        const { isLoading, error, success, account } = this.state;
        let errorMessage = '';
        if (error)
            errorMessage = error.message;

        if (success) {
            return (
                <section className="m-b-lg">
                    <header className="wrapper text-center">
                        <strong>Sign up has been successfully</strong>
                    </header>
                    <Link to="auth/login" className="btn btn-lg btn-info btn-block btn-rounded">Sign in</Link>
                </section>
            );
        }

        return (
            <section id="portfolio">
            <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>Komoditas</h2>
                    <hr className="star-primary"></hr>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal1" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/1.jpg"} className="img-responsive" alt="Cabin"/>
                    </a>
                </div>
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal2" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/2.png"} class="img-responsive" alt="Slice of cake"/>
                    </a>
                </div>
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal3" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/4.jpg"} className="img-responsive" alt="Circus tent"/>
                    </a>
                </div>
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal4" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/4.jpg"} className="img-responsive" alt="Game controller"/>
                    </a>
                </div>
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal5" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/5.jpg"} className="img-responsive" alt="Safe"/>
                    </a>
                </div>
                <div className="col-sm-4 portfolio-item">
                    <a href="#portfolioModal6" className="portfolio-link" data-toggle="modal">
                        <div className="caption">
                            <div className="caption-content">
                                <i className="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src={"assets/images/portfolio/6.jpg"} className="img-responsive" alt="Submarine"/>
                    </a>
                </div>
            </div>
        </div>
      </section>
        );
    }
}
