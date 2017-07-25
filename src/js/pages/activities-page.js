
import React from 'react'
import Infinite from 'react-infinite'
import { Link, hashHistory } from 'react-router'
import TimeAgo from 'react-timeago'
import inagriClient from '../inagri-client'

export default class ActivitiesPage extends React.Component {
	constructor() {
		super();
		this.state = {
            notifications: [],
            hasNext: true,
            isInfiniteLoading: false,
            page: 0,
            itemsNotification: []
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

            inagriClient.apiGet(`accounts/notifications`, {
                offset,
                limit
            }).then(function (response) {
                self.setState({
                    isInfiniteLoading: false
                });
                if(response.data.length > 0) {
                	console.log('wewewe');
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
        let title = notification.from[0].firstName.length + notification.message.title.length > 200 ? notification.message.title.substring(0,52-notification.from[0].firstName.length-3)+'...' : notification.message.title
        switch (notification.eventType) {
            case 'Like':
                return (
                    <Link to={"feed/"+notification.contentId} className="media list-group-item" style={{'height': '79px', color: 'black'}} onClick={() => self.readNotification(notification.id)}>
                        <div className="pull-left thumb-sm col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder">
                            <img src={notification.from[0].images.image64} alt="..." className="img-circle"/>
                        </div>
                        <div className="media-body block m-b-none col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div className="">{notification.from[0].firstName} {title}</div>
                            <div className="text-muted"><TimeAgo date={notification.modified}/></div>
                        </div>
                        <div className="pull-right thumb-sm col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder">
                            <img src={notification.images.image64} alt="..." className="" />
                        </div>
                    </Link>
                );
            case 'Comment':
                return (
                    <Link to={"feed/"+notification.contentId} className="media list-group-item" style={{'height': '79px', color: 'black'}} onClick={() => self.readNotification(notification.id)}>
                        <div className="pull-left thumb-sm col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder">
                            <img src={notification.from[0].images.image64} alt="..." className="img-circle"/>
                        </div>
                        <div className="media-body block m-b-none col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div className="">{notification.from[0].firstName} {title}</div>
                            <div className="text-muted"><TimeAgo date={notification.modified}/></div>
                        </div>
                        <div className="pull-right thumb-sm col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder">
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
                        <div className="pull-right col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padder" style={{'text-align': 'right'}}>
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
        if($(target).text() == 'Unfollow') {
            inagriClient.apiDelete(`accounts/following/${notification.from[0].id}`).then(function (response) {
                $(target).text('Follow');
                inagriClient.apiPut(`accounts/notifications/${notification.id}/read`, {
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
            inagriClient.apiPut(`accounts/following/${notification.from[0].id}`).then(function (response) {
                $(target).text('Unfollow');
                inagriClient.apiPut(`accounts/notifications/${notification.id}/read`, {
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

    readNotification(id) {
        inagriClient.apiPut(`accounts/notifications/${id}/read`, {
            read: true
        }).then(function (response) {
            console.log('id: ' + 'readed');
        }).catch(function (error) {
            console.log(error);
        });
    }

    elementInfiniteLoading() {
        return (
            <div stye={{backgroundColor: 'white'}}>Loading...</div>
        );
    }

	render() {
		let self = this;
		const { itemsNotification, isInfiniteLoading, heightArray } = this.state;

		return (
			<section className="vbox">
				<section className="hbox stretch">
					<aside className="padder-lg">
						<div className="col-lg-9">
							<header className="m-b">
								<h2 className="font-thin m-b page-title">Activities</h2>
								<hr className="hidden-xs"/>
							</header>
							<section className="vbox bg-white">
								<div className="list-group list-group-alt">
	                                <Infinite
	                                    elementHeight={79}
	                                    containerHeight={525}
	                                    infiniteLoadBeginEdgeOffset={200}
	                                    onInfiniteLoad={self.loadNotifications.bind(self)}
	                                    loadingSpinnerDelegate={self.elementInfiniteLoading()}
	                                    isInfiniteLoading={isInfiniteLoading}
	                                    preloadBatchSize={itemsNotification.length*79}>
	                                        {itemsNotification}
	                                </Infinite>
	                            </div>
							</section>
						</div>
					</aside>
				</section>
			</section>
		);
	}
}