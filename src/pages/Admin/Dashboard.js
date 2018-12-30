import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
    withSaga, withReducer, withModal, withDrawer, openDrawer, withConnect,
} from 'app/service';
import cn from 'classnames';
import Helmet from 'react-helmet';
import { Collection, Filter } from 'common/Collection';
import { contentSaga } from 'domain/content/sagas';
import { postAggregateReducer, tagAggregateReducer, topicAggregateReducer } from 'domain/content/reducers';
import { fetchPosts, fetchTopics, fetchTags } from 'domain/content/actions';
import { PostFeed, PostFeedMini } from 'domain/content/components/PostFeed';
import {
    selectPosts, selectPopulars, selectTopics, selectTags,
} from './selectors';


export class Page extends Component {
    componentDidMount = () => {
        this.props.fetchPosts('blogPosts', {
            per_page: 6,
        });

        this.props.fetchPosts('blogPopulars', {
            per_page: 2,
        });

        this.props.fetchTopics('blogTopics', {
            per_page: 3,
        });

        this.props.fetchTags('blogTags', {
            per_page: 3,
        });
    }

    onUpdateFilter = () => {

    }

    onUpdateSort = () => {

    }

    onUpdatePerPage = () => {

    }

    onPaginate = () => {

    }

    render() {
        return (
          <div className={cn('page')}>
              <Helmet title="Blog Page" />
              <div className="container">
              <div className="row">
                        <div className="col-md-9">
                            <Collection
                                className="row"
                                items={this.props.posts}
                                onUpdatePerPage={this.onUpdatePerPage}
                            onUpdateSort={this.onUpdateSort}
                            onPaginate={this.onPaginate}
                            templates={{
                                    default: {
                                        icon: 'grid',
                                        component: PostFeed,
                                        className: 'col-md-4',
                                    },
                                    list: {
                                        icon: 'list',
                                        component: PostFeed,
                                        className: 'col-md-12',
                                    },
                                    colmun: {
                                        icon: '3column',
                                        component: PostFeed,
                                        className: 'col-md-6',
                                    },
                                }
                                }
                          />
                </div>
                      <div className="col-md-3">

                  <div className="sidebar">
                            <div className="widget widget-sidebar">
                                <h6 className="widget-title">Categories</h6>
                                <div className="row link-color-default fs-14 lh-24">
                                        {this.props.topics.map((topic, key) => {
                                            return (<div className="col-6" key={key}><a href="#">{topic.title}</a></div>);
                                        })}
                                    </div>
                              </div>
                            <hr />
                            <div className="widget widget-sidebar">
                                  <h6 className="widget-title">Top posts</h6>
                                    <Collection
                              className="row"
                                        items={this.props.populars}
                              pagination={null}
                                        templates={{
                                            default: {
                                                icon: 'grid',
                                                component: PostFeedMini,
                                                className: 'col-md-12',
                                            },
                                        }
                                        }
                            />
                                </div>
                                <hr />

                                <div className="widget widget-sidebar">
                                <h6 className="widget-title">Tags</h6>
                                <div className="gap-multiline-items-1">
                                      {this.props.tags.map((tag, key) => {
                                            return (<a className="badge badge-secondary" key={key} href="#">{tag.title}</a>);
                                        })}
                                    </div>
                                </div>
                            <hr />
                            <div className="widget widget-sidebar">
                                  <h6 className="widget-title">About</h6>
                                  <p className="small-3">TheSaaS is a responsive, professional, and multipurpose SaaS, Software, Startup and WebApp landing template powered by Bootstrap 4. TheSaaS is a powerful and super flexible tool for any kind of landing pages.</p>
                                </div>
                          </div>
                </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default compose(
    withSaga({ key: 'content', saga: contentSaga }),
    withReducer({ key: 'blogPosts', reducer: postAggregateReducer('blogPosts') }),
    withReducer({ key: 'blogPopulars', reducer: postAggregateReducer('blogPopulars') }),
    withReducer({ key: 'blogTags', reducer: tagAggregateReducer('blogTags') }),
    withReducer({ key: 'blogTopics', reducer: topicAggregateReducer('blogTopics') }),
    withConnect({
        posts: selectPosts,
        populars: selectPopulars,
        topics: selectTopics,
        tags: selectTags,
    }, {
        fetchPosts,
        fetchTopics,
        fetchTags,
        openDrawer,
    }),
)(Page);
