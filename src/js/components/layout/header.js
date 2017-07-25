/**
 * Created by luthfi on 12/16/16.
 */
import React from 'react'
import TimeAgo from 'react-timeago'
import { Link, hashHistory } from 'react-router'
import {connect} from 'react-redux'
import Infinite from 'react-infinite'
import Measure from 'react-measure'

import { logoutAccount } from '../../actions/accounts/logout-actions';
import {getSearch} from '../../actions/search/search-actions'
import svaraClient from '../../svara-client'

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            notifications: [],
            hasNext: true,
            isInfiniteLoading: false,
            page: 0,
            itemsNotification: [],
            unreadNotif: 0
        }
    }

    getNavbarHeaderClassname(open) {
        if (open)
            return 'navbar-header aside bg-dark-skyblue';
        else
            return 'navbar-header aside bg-dark-skyblue nav-xs';
    }

    getActive(open) {
        if (open)
            return 'active';
        else
            return '';
    }

    handleClick(e) {
        e.preventDefault();
        this.props.toggleSideNav();
    }

    handleAdd() {
        this.props.addSong();
    }

    handleClickSideNav(e) {
        e.preventDefault();
        this.props.toggleNavMobile();
    }

    handleLogout(e) {
        e.preventDefault();
        const {dispatch, isAuthenticated} = this.props;
        dispatch(logoutAccount()).then(function(){
            if (isAuthenticated)
                hashHistory.push('/auth');
        });
    }

    getProfilePicture() {
        const { account } = this.props;
        if (account.images !== undefined) {
            if (account.images.image300 == ' ')
                return 'assets/images/m22.jpg';
            else
                return account.images.image300;
        } else {
            return 'assets/images/m22.jpg';
        }
    }

    loadNotifications() {
        let self = this;
        let { hasNext, isInfiniteLoading, notifications, page, itemsNotification } = this.state;
        const limit = 4;
        const offset = page * limit;
        if(hasNext) {
            self.setState({
                hasNext: false,
                isInfiniteLoading: true
            });

            svaraClient.apiGet(`accounts/notifications`, {
                offset,
                limit
            }).then(function (response) {
                self.setState({
                    isInfiniteLoading: false
                });
                if(response.data.length > 0) {
                    console.log(response.data);
                    response.data.forEach((data) => {
                        notifications.push(data);
                    });
                    self.setState({
                        hasNext: true,
                        page: page + 1,
                        notifications: notifications
                    });
                    itemsNotification = notifications.map((notification, index) => {
                        return self.getElementNotification(notification, index);
                    });
                    self.setState({
                        itemsNotification: itemsNotification
                    });
                } else {
                    self.setState({
                        hasNext: false
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    getElementNotification(notification, index) {
        let self = this;
        let title = notification.from[0].firstName.length + notification.message.title.length > 52 ? notification.message.title.substring(0,52-notification.from[0].firstName.length-3)+'...' : notification.message.title
        switch (notification.eventType) {
            case 'Like':
                return (
                    <Link to={"feed/"+notification.contentId} className="media list-group-item" style={{'height': '79px', color: 'black'}} onClick={() => self.readNotification(notification.id)}>
                        <div className="pull-left thumb-sm col-lg-2 col-md-2 col-sm-2 no-padder">
                            <img src={notification.from[0].images.image64} alt="..." className="img-circle"/>
                        </div>
                        <div className="media-body block m-b-none col-lg-8 col-md-8 col-sm-8">
                            <div className="">{notification.from[0].firstName} {title}</div>
                            <div className="text-muted"><TimeAgo date={notification.modified}/></div>
                        </div>
                        <div className="pull-right thumb-sm col-lg-2 col-md-2 col-sm-2 no-padder">
                            <img src={notification.images.image64} alt="..." className="" />
                        </div>
                    </Link>
                );
            case 'Comment':
                return (
                    <Link to={"feed/"+notification.contentId} className="media list-group-item" style={{'height': '79px', color: 'black'}} onClick={() => self.readNotification(notification.id)}>
                        <div className="pull-left thumb-sm col-lg-2 col-md-2 col-sm-2 no-padder">
                            <img src={notification.from[0].images.image64} alt="..." className="img-circle"/>
                        </div>
                        <div className="media-body block m-b-none col-lg-8 col-md-8 col-sm-8">
                            <div className="">{notification.from[0].firstName} {title}</div>
                            <div className="text-muted"><TimeAgo date={notification.modified}/></div>
                        </div>
                        <div className="pull-right thumb-sm col-lg-2 col-md-2 col-sm-2 no-padder">
                            <img src={notification.images.image64} alt="..." className="" />
                        </div>
                    </Link>
                );
            case 'Follow':
                return (
                    <div className="media list-group-item" style={{'height': '79px', color: 'black'}}>
                        <div className="pull-left thumb-sm col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder">
                            <img src={notification.from[0].images.image64} alt="..." className="img-circle"/>
                        </div>
                        <div className="media-body block m-b-none col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div>{notification.from[0].firstName} {title}</div>
                            <div className="text-muted"><TimeAgo date={notification.modified}/></div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder m-l-n-sm">
                            <button className="btn btn-success btn-sm btn-rounded" onClick={(ev) => self.handleFollow(ev, notification)}>{notification.from[0].followed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div></div>
                );
        }
    }

    handleFollow(e, notification) {
        e.preventDefault();
        const target = e.target
        $("#list-notif").addClass('open');
        if($(target).text() == 'Unfollow') {
            svaraClient.apiDelete(`accounts/following/${notification.from[0].id}`).then(function (response) {
                $(target).text('Follow');
                svaraClient.apiPut(`accounts/notifications/${notification.id}/read`, {
                    read: true
                }).then(function (response) {
                    console.log(notification.id + ': readed');
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            svaraClient.apiPut(`accounts/following/${notification.from[0].id}`).then(function (response) {
                $(target).text('Unfollow');
                svaraClient.apiPut(`accounts/notifications/${notification.id}/read`, {
                    read: true
                }).then(function (response) {
                    console.log('id: ' + 'readed');
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    handleSearch(e) {
        e.preventDefault();
        const query = e.target.query.value;
        const { dispatch } = this.props;

        dispatch(getSearch(query));
        hashHistory.push('/search/' + query);
    }

    componentWillMount() {
        let self = this;
        self.getUnreadNotif();
    }

    componentDidMount() {
        var self = this;
        $('#btn-search').click(function () {
            const isMobileNavHidden = $('#mobile-nav').hasClass('hidden');
            const href = $('#mobile-back').attr('href');
            const location = window.location.href;
            $('#mobile-nav').addClass('hidden');
            $('#mobile-back').removeClass('hidden');
            $('#mobile-back').removeAttr('href');
            $('#form-search').removeClass('hidden-xs');
            $('input[name="query"]').focus();
            $('#mobile-back').click(function (e) {
                e.preventDefault();
                if ($('#mobile-back').attr('href') !== undefined)
                    window.location.pathname = $('#mobile-back').attr('href');
                $('#form-search').addClass('hidden-xs');
                if (isMobileNavHidden) {
                    $('#mobile-back').attr('href', href);
                } else {
                    $('#mobile-back').addClass('hidden');
                    $('#mobile-nav').removeClass('hidden');
                }
                $('#mobile-back').unbind('click');
            });
        });
    }

    getUnreadNotif() {
        let self = this;
        let { unreadNotif } = this.state;
        svaraClient.apiGet(`accounts/notifications/count`, {
            read: false
        }).then(function (response) {
            unreadNotif = response.data;
            self.setState({
                unreadNotif: unreadNotif
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    elementInfiniteLoading() {
        const { hasNext } = this.props;
        if (hasNext) {
            return (
                <div stye={{backgroundColor: 'white'}}>Loading...</div>
            );
        } else {
            return (<div></div>);
        }
    }

    readNotification(id) {
        svaraClient.apiPut(`accounts/notifications/${id}/read`, {
            read: true
        }).then(function (response) {
            console.log('id: ' + 'readed');
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let self = this;
        const { account } = this.props;
        const { itemsNotification, isInfiniteLoading, heightArray, unreadNotif, notifications } = this.state;

        return (
            <header className="bg-dark-skyblue header header-md navbar navbar-fixed-top-xs">
                <div className={this.getNavbarHeaderClassname(this.props.sideNavOpen)}>
                    <a id="mobile-nav" className="btn btn-link visible-xs" data-toggle="dropdown" data-target=".user">
                        <i className="icon-list"/>
                    </a>
                    <a id="mobile-back" className="btn btn-link visible-xs hidden">
                        <i className="fa fa-angle-left"/>
                    </a>
                    <a href="index.html" className="navbar-brand text-lt">
                        <img className="hidden-xs" src="assets/images/logo.png" alt="."/>
                        <span className="hidden-nav-xs m-l-sm hidden-xs">Svara</span>
                        <span id="mobile-title" className="visible-xs m-l-sm">Svara</span>
                    </a>
                    <a className="btn btn-link visible-xs" id="btn-search">
                        <i className="fa fa-search"></i>
                    </a>
                </div>
                <ul className="nav navbar-nav hidden-xs">
                    <li>
                        <a href="#" className={this.getActive(this.props.sideNavOpen)} onClick={this.handleClick.bind(this)}>
                            <i className="fa fa-indent text" />
                            <i className="fa fa-dedent text-active" />
                        </a>
                    </li>
                </ul>
                <form id="form-search" className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search" onSubmit={this.handleSearch.bind(this)}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-btn">
                              <button type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search"></i></button>
                            </span>
                            <input name="query" type="text" className="form-control input-sm no-border rounded" placeholder="Search songs, albums..." />
                        </div>
                    </div>
                </form>
                <div className="navbar-right ">
                    <ul className="nav navbar-nav m-n hidden-xs nav-user user">
                        <li id="list-notif" className="hidden-xs">
                            <a href="#" className="dropdown-toggle lt" data-toggle="dropdown">
                                <i className="icon-bell"></i>
                                <span className="badge badge-sm up bg-danger count">{unreadNotif > 0 ? unreadNotif : ""}</span>
                            </a>
                            <section className="dropdown-menu aside-xl animated fadeInUp">
                                <section className="panel bg-white">
                                    <div className="panel-heading b-light bg-light">
                                        <strong>You have <span className="count">{unreadNotif}</span> notifications</strong>
                                    </div>
                                    <div className="list-group list-group-alt">
                                        <Infinite
                                            elementHeight={79}
                                            containerHeight={200}
                                            infiniteLoadBeginEdgeOffset={50}
                                            onInfiniteLoad={self.loadNotifications.bind(self)}
                                            loadingSpinnerDelegate={self.elementInfiniteLoading()}
                                            isInfiniteLoading={isInfiniteLoading} 
                                            preloadBatchSize={itemsNotification.length*79} >
                                                {itemsNotification}
                                        </Infinite>
                                    </div>
                                    <div className="panel-footer text-sm">
                                        <a href="#" className="pull-right" style={{color: 'black'}}><i className="fa fa-cog"></i></a>
                                        <Link to="activities" data-toggle="className:show animated fadeInRight" style={{color: 'black'}}>See all the notifications</Link>
                                    </div>
                                </section>
                            </section>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle bg clear" data-toggle="dropdown">
                                <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                <img src={this.getProfilePicture()} alt="..." />
                                </span>
                                {account.firstName} {account.lastName} <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight">
                                <li>
                                    <span className="arrow top"></span>
                                    <a href="#">Settings</a>
                                </li>
                                <li>
                                    <a href={"#/profile/"+account.username}>Profile</a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="badge bg-danger pull-right">{unreadNotif}</span>
                                        Notifications
                                    </a>
                                </li>
                                <li>
                                    <a href="docs.html">Help</a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}
