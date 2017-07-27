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
            // <section className="m-b-lg">
            //     <header className="wrapper text-center">
            //         <strong>Sign up to find interesting thing</strong>
            //     </header>
            //     <form onSubmit={this.handleSubmit.bind(this)}>
            //         <div className="form-group">
            //             <input placeholder="First Name" name="firstName" className="form-control rounded input-lg text-center no-border" defaultValue={account.firstName} />
            //         </div>
            //         <div className="form-group">
            //             <input placeholder="Last Name" name="lastName" className="form-control rounded input-lg text-center no-border" defaultValue={account.lastName} />
            //         </div>
            //         <div className="row row-sm">
            //             <div className="form-group col-xs-6" style={{paddingRight: '5px'}}>
            //                 <input placeholder="Birthday" name="birthday" className="form-control rounded input-lg text-center no-border datepicker-input" data-date-format="yyyy-mm-dd" defaultValue={account.birthday} />
            //             </div>
            //             <div className="form-group col-xs-6" style={{paddingLeft: '5px'}}>
            //                 <select className="form-control rounded input-lg text-center no-border" name="gender" defaultValue={account.gender}>
            //                     <option defaultValue="" hidden={true}>Gender</option>
            //                     <option>Male</option>
            //                     <option>Female</option>
            //                 </select>
            //             </div>
            //         </div>
            //         <div className="form-group">
            //             <input type="email" placeholder="Email" name="email" className="form-control rounded input-lg text-center no-border" defaultValue={account.email} />
            //         </div>
            //         <div className="form-group">
            //             <input type="password" placeholder="Password" name="password" className="form-control rounded input-lg text-center no-border" />
            //         </div>
            //         <div className="form-group">
            //             <input placeholder="Choose Username" name="username" className="form-control rounded input-lg text-center no-border" defaultValue={account.username} />
            //         </div>
            //         <div className="text-center m-t m-b"><small>{errorMessage}</small></div>
            //         <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded"><i className="icon-arrow-right pull-right" /><span className="m-r-n-lg">Sign up</span></button>
            //         <div className="line line-dashed" />
            //         <p className="text-muted text-center"><small>Already have an account?</small></p>
            //         <Link to="auth/login" className="btn btn-lg btn-info btn-block btn-rounded">Sign in</Link>
            //     </form>
            // </section>




             <section id="contact" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 wow fadeInUp" data-wow-delay="0.3s">
                             <div className="heading wow fadeInUp">
                                    <h2>Input Komoditas</h2>
                                 <div className="form-group">
                                     <form onSubmit={this.handleSubmit.bind(this)} id="contact-form">
                                         <div className="form-group">
                                            <input placeholder="Nama Komoditas" name="firstName" className="form-control rounded input-lg text-center no-border" defaultValue={account.firstName} />
                                         </div>
                                         <div className="row row-sm">
                                                <div className="form-group col-xs-6" style={{paddingRight: '5px'}}>
                                                    <input placeholder="Harga" name="birthday" className="form-control rounded input-lg text-center no-border datepicker-input" data-date-format="yyyy-mm-dd" defaultValue={account.birthday} />
                                                </div>
                                                <div className="form-group col-xs-6" style={{paddingRight: '5px'}}>
                                                    <input placeholder="Kuantitas" name="birthday" className="form-control rounded input-lg text-center no-border datepicker-input" data-date-format="yyyy-mm-dd" defaultValue={account.birthday} />
                                                </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" placeholder="Status Masa Panen" name="email" className="form-control rounded input-lg text-center no-border" defaultValue={account.email} />
                                        </div>
                                        <div className="form-group col-xs-6" style={{paddingLeft: '5px'}}>
                                            <select className="form-control rounded input-lg text-center no-border" name="gender" defaultValue={account.gender}>
                                                <option defaultValue="" hidden={true}>Kategori Komoditas</option>
                                                <option>Sayuran</option>
                                                <option>Buah Buahan</option>
                                            </select>
                                        </div>

                                        <section id="upload-image" className="section">

                                                <h4>Upload gambar komoditas</h4>
                                                <br></br>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-2 wow fadeInLeft">
                                                      <div className="wow fadeInDown" data-wow-delay="0.3s">
                                                        <center>
                                                            <a className="btn btn-default btn-register" href="#/" role="button">+</a>
                                                        </center>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-2 wow fadeInLeft" data-wow-delay="0.3s">
                                                        <div className="wow fadeInDown" data-wow-delay="0.3s">
                                                        <center>
                                                            <a className="btn btn-default btn-register" href="#/" role="button">+
                                                            </a> 
                                                        </center>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-2 wow fadeInLeft">
                                                      <div className="wow fadeInDown" data-wow-delay="0.3s">
                                                        <center>
                                                            <a className="btn btn-default btn-register" href="#/" role="button">+</a>
                                                        </center>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-2 wow fadeInLeft" data-wow-delay="0.3s">
                                                        <div className="wow fadeInDown" data-wow-delay="0.3s">
                                                        <center>
                                                            <a className="btn btn-default btn-register" href="#/" role="button">+
                                                            </a> 
                                                        </center>
                                                        </div>
                                                    </div>
                                            </div>
                                        </section>
                                        
                                         <button className="btn btn-send" type="submit">Daftar</button>
                                     </form>

                                     <div id="success">
                                         <p>Your Message was sent successfully</p>
                                     </div>
                                     <div id="error">
                                         <p>Your Message was not sent successfully</p>
                                     </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
