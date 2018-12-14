import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer, withConnect } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Collection, Filter } from 'common/Collection';
import { CommentList, CommentForm } from 'common/Discussion/Comment';
import { PostFeed } from 'domain/content/components/PostFeed';
import { PageHeader } from 'common/Page';
import { contentSaga } from 'domain/content/sagas';
import { postQueryReducer, postCommandReducer } from 'domain/content/reducers';
import { fetchPost, fetchComments, fetchRelatables } from 'domain/content/actions';
import { selectPost, selectComments, selectRelatables } from './selectors';

export class Page extends Component<{}, {}> {

    componentDidMount = () => {
        this.props.fetchPost({
            post_id: 6,
        });
        this.props.fetchComments({
            post_id: 6,
        });
        this.props.fetchRelatables({
            post_id: 6,
        });
    }

    onCreateComment = (comment) => {

    }

    onCommentUpdate = (comment) => {
        
    }

    onCommentDelete = (id) => {

    }

    onCommentLike = (id) => {

    }

    onLoadComments = (args) => {
        
    }

    render() {
        console.log(this.props);
        
        const { post } = this.props;
        if(!post) {
            return;
        }
        return (
            <div className={classNames('blog-post')}>
                <PageHeader
                    title={post.title}
                    meta="Posted on 6 December, 2018 - Last Modified on 6 December, 2018"
                />
                <main className="content">
                    <div className="container">
                        <article className="article">
                            <div 
                                className="article-body" 
                                dangerouslySetInnerHTML={{__html: post.content}} 
                            />
                        </article>
                    </div>
                </main>
                <div className="discussion">
                    <div className="container">
                        <CommentList
                        comments={this.props.comments} 
                        />
                        <CommentForm
                        />
                    </div>
                </div>
                <div className="related-posts">
                    <div className="container">
                        <Collection
                        className="row" 
                        items={this.props.relateds} 
                        pagination={null}
                        templates={{
                            default: {
                                icon: 'grid',
                                component: PostFeed,
                                className: 'col-md-3'
                            }
                        }
                        } 
                    />
                    </div>
                </div>
                </div>
                );
    }
}


export default compose(
    withSaga({ key: 'content', saga: contentSaga }),
    withReducer({ key: 'postQuery', reducer: postQueryReducer }),
    //withReducer({ key: 'postComment', reducer: postCommentReducer }),
    withConnect({
        post: selectPost,
        comments: selectComments,
        relateds: selectRelatables
    }, {
        fetchPost,
        fetchComments,
        fetchRelatables
    }))(Page);