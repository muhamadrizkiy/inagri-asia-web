/**
 * Created by muhamadrizki on 24/07/17.
 */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {Link} from 'react-router'

import Item from '../components/common/item'

import inagriClient from '../inagri-client'

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            dataFilter: null,
            hasNext: true,
            contentType: '',
            contents: []
        }
    }

    componentWillMount() {
        const { params } = this.props;
        let contentPage = JSON.parse(atob(params.contentPage));
        console.log(contentPage);
        contentPage.dataFilter.dataProp.limit = 12;
        this.setState({
            title: contentPage.name,
            dataFilter: contentPage.dataFilter
        });
    }

    componentDidMount() {
        $('#mobile-title').html(this.state.title);
        $('#mobile-nav').addClass('hidden');
        $('#mobile-back').removeClass('hidden');
        $('#mobile-back').attr('href', '#/' + this.props.params.parent)
    }

    componentWillUnmount() {
        $('#mobile-back').addClass('hidden');
        $('#mobile-nav').removeClass('hidden');
    }

    loadContents(page) {
        const self = this;
        const { hasNext, dataFilter, contents } = this.state;
        dataFilter.dataProp.offset = String(12 * (page - 1));
        if (hasNext) {
            inagriClient.apiGet('curationPageContents/getContent', {
                filter: dataFilter
            }).then(function (response) {
                if (response.data.dataList.length > 0) {
                    response.data.dataList.forEach(function (data) {
                        contents.push(data);
                    });
                    self.setState({
                        contents: contents,
                        contentType: response.data.contentType
                    });
                    if (response.data.dataList.length < 12) {
                        self.setState({
                            hasNext: false
                        });
                    }
                } else {
                    self.setState({
                        hasNext: false
                    });
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }

    render() {

        const { contents, title, contentType, hasNext } = this.state;

        let items = [];

        contents.forEach(function (data) {
            items.push(
                <Item
                    contentType={contentType}
                    itemId={data.id}
                    itemData={data}/>
            );
        });

        const loader = <div className="loader"></div>;

        return (
            <section className="vbox">
                <section className="w-f-md" id="bjax-target">
                    <section className="hbox stretch">
                        <section>
                            <section className="vbox">
                                <section className="scrollable padder-lg">
                                    <h2 className="font-thin m-b page-title hidden-xs">
                                        <Link to={this.props.params.parent}><i className="fa fa-long-arrow-left" /></Link> {title}
                                    </h2>
                                    <hr className="hidden-xs"/>

                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadContents.bind(this)}
                                        hasMore={hasNext}
                                        loader={loader}>

                                        <div className="row row-sm content-library">
                                            {items}
                                        </div>
                                    </InfiniteScroll>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        );
    }
}