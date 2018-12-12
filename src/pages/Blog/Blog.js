import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer, withModal, withDrawer, openDrawer } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import { createPostsReducer, createTopicsReducer, createTagsReducer } from 'domain/content/reducers';
import { postsSaga } from 'domain/content/sagas';
import { fetchPosts, fetchTopics, fetchTags } from 'domain/content/actions';
import { PostFeed } from 'domain/content/components/PostFeed';
import { PostList } from 'domain/content/components/PostWidget';
import { PostFilter, PostPagination, PostToolbar } from 'domain/content/components/PostCollection';
import LoginModal from 'containers/Auth/LoginModal';
import {
    selectPosts, selectPopulars, selectTopics, selectTags,
} from './selectors';

export class Page extends Component {
  componentDidMount = () => {
      this.props.fetchPosts('blog_posts', {
          per_page: 6,
      });

      this.props.fetchPosts('blog_populars', {
          per_page: 2,
      });

      this.props.fetchTopics('blog_topics', {
          per_page: 3,
      });

      this.props.fetchTags('blog_tags', {
          per_page: 3,
      });
  }

  render() {
      return (
        <div className={classNames('page')}>
            <Helmet title="Blog Page" />
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <PostToolbar />
                        <div className="row">
                          {this.props.posts.map((post, key) => {
                              return (<div className="col-md-4" key={key}><PostFeed {...post} /></div>);
                              })}
                      </div>
                      <PostPagination />
                  </div>
                  <div className="col-md-3">
                    <PostFilter />
                    <div className="sidebar">
                      <div className="widget widget-sidebar">
                          <h6 className="widget-title">Search</h6>
                          <form className="search" target="#" method="GET">
                              <div className="field flex">
                                  <input type="text" className="form-control" name="s" placeholder="Search" />
                                  <button className="btn" type="submit">
                                      <i className="mdi mdi-search" />
                                      SEARCH
                                  </button>
                                  <button type="button" onClick={() => this.props.openDrawer('testraw')}>
                                    Open drawer
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr />
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
                        <PostList posts={this.props.populars} />
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
    withModal({ key: 'signup', modal: LoginModal }),
    withDrawer({ key: 'testraw', drawer: LoginModal }),
    withReducer({ key: 'blog_posts', reducer: createPostsReducer('blog_posts') }),
    withReducer({ key: 'blog_populars', reducer: createPostsReducer('blog_populars') }),
    withReducer({ key: 'blog_tags', reducer: createTagsReducer('blog_tags') }),
    withReducer({ key: 'blog_topics', reducer: createTopicsReducer('blog_topics') }),
    withSaga({ key: 'blog', saga: postsSaga }),
    connect(createStructuredSelector({
        posts: selectPosts,
        populars: selectPopulars,
        topics: selectTopics,
        tags: selectTags,
    }),
    (dispatch) => {
        return bindActionCreators({
            fetchPosts,
            fetchTopics,
            fetchTags,
            openDrawer,
        }, dispatch);
    }),
    )(Page);
