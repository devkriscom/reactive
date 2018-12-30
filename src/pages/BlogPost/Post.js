import './Post.scss';
import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer, withConnect } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Collection, Filter } from 'common/Collection';
import { CommentList, CommentForm } from 'common/Discussion/Comment';
import { PostFeed } from 'domain/content/components/PostFeed';
import { Header, Article } from 'common/Page';
import { contentSaga } from 'domain/content/sagas';
import { postQueryReducer, postCommandReducer } from 'domain/content/reducers';
import { fetchPost, fetchComments, fetchRelatables } from 'domain/content/actions';
import { selectPost, selectComments, selectRelatables } from './selectors';

export class Page extends Component<{}, {}> {
    componentDidMount = () => {
        this.props.fetchPost({
            per_page: 4,
        });
        this.props.fetchComments({
            per_page: 4,
        });
        this.props.fetchRelatables({
            per_page: 4,
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
        const { post } = this.props;
        if (!post) {
            return;
        }
        return (
            <div className={cn('blog-post')}>
                <Header data={{
                    title: 'A new NASA contest for the next generation of space exploration',
                    meta: 'Posted on 6 December, 2018 - Last Modified on 6 December, 2018',
                    }}
                />
                <main className="content">
                    <Article
                        content={post.content}
                    />
                </main>
                <div className="discussion">
                    <div className="container">
                        <CommentList
                            comments={this.props.comments}
                        />
                        <CommentForm />
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
                                    className: 'col-md-3',
                                },
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
    withConnect({
        post: selectPost,
        comments: selectComments,
        relateds: selectRelatables,
    }, {
        fetchPost,
        fetchComments,
        fetchRelatables,
    }),
    )(Page);
