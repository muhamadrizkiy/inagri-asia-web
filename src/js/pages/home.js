/**
 * Created by muhamadrizki on 24/07/17.
 */

import React from 'react'

import {Link} from 'react-router'
import inagriClient from '../inagri-client'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            curationPages: []
        };
    }

    // componentWillMount() {
    //    var self = this;
    //    inagriClient.apiGet(`curationPages/56fd2e904fbf42f357f6b113/contents`).then(function (response) {
    //         console.log('wawawa');
    //         console.log(response.data);
    //        self.setState({
    //            curationPages: response.data
    //        });
    //    }).catch(function (error) {
    //        console.log(error);
    //    });
    // }

    componentDidMount() {
        $('#mobile-title').html('Home');
    }

    getProfilePicture() {
        const { account } = this.props;
        // console.log(account)
        if (account.images !== undefined) {
            if (account.images.image300 == ' ')
                return 'assets/images/m22.jpg';
            else
                return account.images.image300;
        } else {
            return 'assets/images/m22.jpg';
        }
    }

    render() {
        return (
        <div>
            <section id="hero-area">
              <div className="container">
                  <div className="row">
                      <div className="col-md-6">
                          <div className="block">
                            <p className="wow fadeInDown" data-wow-delay="0.3s"> Kami adalah</p>
                                <h1 className="wow fadeInDown">Pasar Komoditas Pertanian online untuk bisnis</h1>
                            <p className="wow fadeInDown" data-wow-delay="0.3s">retail, restoran, dan industri makanan</p>
                              <div className="wow fadeInDown" data-wow-delay="0.3s">
                                <a className="btn btn-default btn-home" href="#about" role="button">Mulai Sekarang</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </section>

            <section id="register" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-8 wow fadeInLeft">
                          <div className="wow fadeInDown" data-wow-delay="0.3s">
                            <center>
                                <a className="btn btn-default btn-register" href="#/auth/signup" role="button">Daftar Sebagai Petani</a>
                            </center>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-8 wow fadeInLeft" data-wow-delay="0.3s">
                            <div className="wow fadeInDown" data-wow-delay="0.3s">
                            <center>
                                <a className="btn btn-default btn-register" href="#/auth/signup" role="button">Daftar Sebagai Pelanggan
                                </a> 
                            </center>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="service" className="section">
                <div className="container">
                    <div className="row">
                        <div className="heading wow fadeInUp">
                            <h2>Apa yang kami sediakan?</h2>
                        </div>
                        <div className="col-sm-5 col-md-4 wow fadeInLeft">
                            <div className="service">
                                <div className="icon-box">
                                  <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/1.png"} width="60%" /> 
                                        </i>   
                                    </span>
                                </div>
                                <div className="caption">
                                    <h3>Herbs & Spices</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 wow fadeInLeft" data-wow-delay="0.3s">
                            <div className="service">
                                <div className="icon-box">
                                  <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/2.png"} width="60%"/> 
                                        </i>    
                                    </span>
                                </div>
                                <div className="caption">
                                  <h3>Grains</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 wow fadeInLeft" data-wow-delay="0.6s">
                            <div className="service">
                                <div className="icon-box">
                                  <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/3.png"} width="60%"/> 
                                        </i>     
                                    </span>
                                </div>
                                <div className="caption">
                                    <h3>Meat</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="heading wow fadeInUp">
                        </div>
                        <div className="col-sm-5 col-md-4 wow fadeInLeft">
                            <div className="service">
                                <div className="icon-box">
                                    <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/4.png"} width="60%"/> 
                                        </i>   
                                    </span>
                                </div>
                                <div class="caption">
                                    <h3>Fruits</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 wow fadeInLeft" data-wow-delay="0.3s">
                            <div className="service">
                                <div className="icon-box">
                                    <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/5.png"} width="60%" /> 
                                        </i>    
                                    </span>
                                </div>
                                <div className="caption">
                                    <h3>FIsh</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 wow fadeInLeft" data-wow-delay="0.6s">
                            <div className="service">
                                <div className="icon-box">
                                    <span className="icon">
                                        <i>
                                           <img src={"assets/images/produk/6.png"} width="60%"/> 
                                        </i>     
                                    </span>
                                </div>
                                <div className="caption">
                                    <h3>Vegetables</h3>
                                    <p>Lorem ipsum dolor sit amet, con-sectetur adipisicing elit, sed do eiusmod tempor incididunt ut</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section id="call-to-action" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 wow text-center">
                            <div className="block">
                                <h2>Lorem ipsum dolor sit amet, consectetur adipisicing</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter Your Email Address"/>
                                    <button className="btn btn-default btn-submit" type="submit">Get Notified</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wow fadeInUp">
              <div className="map-wrapper">
              </div>
            </section>
        </div>
        );
    }
}
