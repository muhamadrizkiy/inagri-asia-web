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
            <section id="hero-area">
              <div className="container">
                  <div className="row">
                      <div className="col-md-6">
                          <div className="block">
                            <p className="wow fadeInDown" data-wow-delay="0.3s"> Selamat Datang di</p>
                                <h1 className="wow fadeInDown">Inagri Supplier Dashboard</h1>
                            <p className="wow fadeInDown" data-wow-delay="0.3s">Atur komoditas yang bisa kamu jual disini</p>
                              <div className="wow fadeInDown" data-wow-delay="0.3s">
                                <a className="btn btn-default btn-home" href="#/komoditas" role="button">Mulai Sekarang</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </section>
        );
    }
};