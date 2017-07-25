/**
 * Created by muhamadrizki on 24/07/17.
 */

import React from 'react'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import Notifications from 'react-notify-toast'

import {getAccount} from '../actions/accounts/get-account-actions'

@connect((store) => {
    return {
        isAuthenticated: store.account.isAuthenticated,
        token: store.account.token,
        userId: store.account.userId,
        account: store.account.account
    };
})
export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            sideNavOpen: false,
            navMobileOpen: false
        }
    }

    toggleSideNav() {
        this.setState({sideNavOpen: !this.state.sideNavOpen});
    }

    toggleNavMobile() {
        this.setState({navMobileOpen: !this.state.navMobileOpen});
    }


    componentWillMount() {
        const { dispatch, userId} = this.props;
        dispatch(getAccount(userId));
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            <div className="navbar-default navbar-fixed-top" id="navigation">
              <div className="container">
                  
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">
                            <img className="logo-1" src={"assets/images/logo-2.png"} alt="LOGO" width="171px" height="38px"/>
                          <img className="logo-2" src={"assets/images/logo-2.png"} alt="LOGO" width="171px" height="38px"/>
                      </a>
                  </div>

                  <nav className="collapse navbar-collapse" id="navbar">
                      <ul className="nav navbar-nav navbar-right" id="top-nav">
                          <li className="current"><a href="#/">Cara Kerja</a></li>
                          <li><a href="#/">Produk</a></li>
                            <li><a href="#/auth/login">Masuk</a></li>
                            <li><a href="#/auth/signup">Register</a></li>
                      </ul>
                  </nav>
              </div>
            </div>

            <div>
            {this.props.children}
            </div>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block">
                                <p>Copyright &copy; <a href="http://www.inagri.asia">Inagri Asia</a>| All right reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            </div>

        );
    }
}
