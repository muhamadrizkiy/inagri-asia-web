/**
 * Created by luthfi on 12/16/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import Notifications from 'react-notify-toast'

import Content from '../components/layout/content'
import Header from '../components/layout/header'
import Player from '../components/layout/player'
import SideNavigation from '../components/layout/side-navigation'

import {getAccount} from '../actions/accounts/get-account-actions'

var songs = [
    {
        title:"Bubble",
        artist:"Miaow",
        mp3:"http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.ogg",
        poster: "assets/images/m0.jpg",
        id: 1
    },
    {
        title:"Lentement",
        artist:"Miaow",
        mp3:"http://flatfull.com/themes/assets/musics/Miaow-03-Lentement.ogg",
        poster: "assets/images/m1.jpg",
        id: 2
    },
    {
        title:"Partir",
        artist:"Miaow",
        mp3:"http://flatfull.com/themes/assets/musics/Miaow-09-Partir.ogg",
        poster: "assets/images/m2.jpg",
        id: 3
    }
];

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

    addSong() {
        this.refs.player.addSong({
            title:"Sukapura",
            artist:"Test",
            mp3:"http://stream.suararadio.com:8000/tasik_sukapurafm_aac",
            poster: "images/m0.jpg"
        });
    }

    componentWillMount() {
        const { dispatch, userId} = this.props;
        dispatch(getAccount(userId));
    }

    componentDidMount() {

    }

    render() {
        const { dispatch, isAuthenticated, account } = this.props;

        if(!isAuthenticated)
            hashHistory.push('/auth');

        return (
            <div style={{height:'100%'}}>
                <Notifications />
                <section className="vbox">
                    <Header dispatch={dispatch} account={account} isAuthenticated={isAuthenticated} addSong={this.addSong.bind(this)} toggleNavMobile={this.toggleNavMobile.bind(this)} toggleSideNav={this.toggleSideNav.bind(this)} sideNavOpen={this.state.sideNavOpen} />
                    <section>
                        <section className="hbox stretch">
                            <SideNavigation toggleNavMobile={this.toggleNavMobile.bind(this)} sideNavOpen={this.state.sideNavOpen} navMobileOpen={this.state.navMobileOpen} />
                            <Content>
                                {React.cloneElement(this.props.children, { account: account })}
                            </Content>
                        </section>
                    </section>
                </section>
                <Player navMobileOpen={this.state.navMobileOpen} ref="player" />
            </div>
        );
    }
}
