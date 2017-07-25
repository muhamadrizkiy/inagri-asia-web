/**
 * Created by luthfi on 12/20/16.
 */
import React from 'react'

import {Link} from 'react-router'
import svaraClient from '../svara-client'
import { swipeDetect } from '../utils'

import CurationList from '../components/curation/curation-list'
import Item from '../components/common/item'
import Timeline from '../components/home/timeline'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            curationPages: []
        };
    }

    componentWillMount() {
       var self = this;
       svaraClient.apiGet(`curationPages/56fd2e904fbf42f357f6b113/contents`).then(function (response) {
            console.log('wawawa');
            console.log(response.data);
           self.setState({
               curationPages: response.data
           });
       }).catch(function (error) {
           console.log(error);
       });
    }

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
        const { account, location } = this.props;
        let header = (
            <header className="header hidden-xs playlist">
              <h4 className="font-thin" style={{marginTop:'19px'}}>Tracks</h4>
              <hr style={{marginLeft:'-15px',marginRight:'-15px'}}/>
            </header>
        );

        let curationItems = this.state.curationPages.map((curationPage) => (
            <CurationList contents={curationPage} parent="hits" />
        ));

        return (
            <section className="hbox stretch">
                <section>
                    <section className="vbox">
                        <section className="scrollable padder-lg w-f-md home-page" id="bjax-target">
                            <div className="main-nav-xs visible-xs">
                                <ul className="nav nav-pills">
                                    <li role="presentation" className="active">
                                        <Link to="/">
                                            <i className="icon icon-home" />
                                        </Link>
                                    </li>
                                    <li role="presentation" className="">
                                        <Link to="/discover">
                                            <i className="icon icon-compass" />
                                        </Link>
                                    </li>
                                    <li role="presentation" className="">
                                        <Link to="/hits">
                                            <i className="icon icon-star" />
                                        </Link>
                                    </li>
                                    <li role="presentation" className="">
                                        <Link to="/radio">
                                            <i className="icon icon-microphone" />
                                        </Link>
                                    </li>
                                    <li role="presentation" className="">
                                        <Link to="/library">
                                            <i className="icon icon-playlist" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <aside className="bg-white">
                                <section className="vbox">
                                    <Timeline 
                                        profilePic={this.getProfilePicture()}
                                        account={account}
                                        location={location}/>
                                </section>
                            </aside>
                        </section>
                    </section>
                </section>
                <aside className="col-md-5 bg-light dk" id="sidebar">
                    <section className="vbox animated fadeInRight">
                        <section className="w-f-lg scrollable hover">
                            {curationItems}
                        </section>
                    </section>
                </aside>
            </section>
        );
    }
}
