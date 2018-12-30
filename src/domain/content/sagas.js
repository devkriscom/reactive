import {
    all, call, fork, put, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { dropRight, take } from 'lodash';
import {
    fetchedPosts, fetchedTopics, fetchedTags, fetchedPost, fetchedComments, fetchedRelatables, commentCreated, commentUpdated, commentDeleted, commentLiked,
} from './actions';
import {
    apiFetchPosts, apiFetchTopics, apiFetchTags, apiFetchPost, apiFetchComments, apiFetchRelatables, apiCreateComment, apiUpdateComment, apiDeleteComment, apiLikeComment,
} from './apis';
import {
    FETCH_POSTS,
    FILTER_POSTS,
    FETCH_TOPICS,
    FETCH_TAGS,
    FETCH_POST,
    FETCH_COMMENTS,
    FETCH_RELATABLES,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    REPLAY_COMMENT,
    LIKE_COMMENT,
} from './constants';

function* getPosts({
    position, page, per_page, sort, filter,
}) {
    try {
        const { posts, response } = yield call(apiFetchPosts, page, per_page, sort, filter);
        const posts2 = posts.reduce((acc, curr) => {
            const content = '';
            acc.push({
                title: dropRight(take(curr.title, 30).join('').split(' ')).join(' '),
                link: curr.slug,
            });
            return acc;
        }, []);

        yield put(fetchedPosts(position, posts2, response));
    } catch (err) {}
}

function* getTopics({
    position, page, per_page, sort, filter,
}) {
    try {
        const { topics, response } = yield call(apiFetchTopics, page, per_page, sort, filter);
        const topics2 = topics.reduce((acc, curr) => {
            acc.push({
                title: curr.title,
            });
            return acc;
        }, []);

        yield put(fetchedTopics(position, topics2, response));
    } catch (err) {}
}

function* getTags({
    position, page, per_page, sort, filter,
}) {
    try {
        const { tags, response } = yield call(apiFetchTags, page, per_page, sort, filter);
        const tagers = tags.reduce((acc, curr) => {
            acc.push({
                title: curr.title,
            });
            return acc;
        }, []);

        yield put(fetchedTags(position, tagers, response));
    } catch (err) {}
}

function* getPost({ post_id }) {
    try {
        const { post, response } = yield call(apiFetchPost, post_id);

        yield put(fetchedPost(post, response));
    } catch (err) {}
}

function* getRelatables({
    post_id, page, per_page, sort, filter,
}) {
    try {
        const { posts, response } = yield call(apiFetchRelatables, post_id, page, per_page, sort, filter);
        yield put(fetchedRelatables(posts, response));
    } catch (err) {}
}

function* getComments({
    position, post_id, page, per_page, sort, filter,
}) {
    try {
        const { comments, response } = yield call(apiFetchComments, post_id, page, per_page, sort, filter);
        yield put(fetchedComments(comments, response));
    } catch (err) {}
}

function* createComment({ comment = {} }) {
    try {
        const { comment, response } = yield call(apiCreateComment);
        yield put(commentCreated(comment, response));
    } catch (err) {}
}

function* updateComment({ comment = {} }) {
    try {
        const { comment, response } = yield call(apiUpdateComment);
        yield put(commentUpdated(comment, response));
    } catch (err) {}
}

function* deleteComment({ id }) {
    try {
        const { id, response } = yield call(apiDeleteComment);
        yield put(commentDeleted(id, response));
    } catch (err) {}
}

function* likeComment({ id }) {
    try {
        const { id, response } = yield call(apiLikeComment);
        yield put(commentLiked(id, response));
    } catch (err) {}
}

export function* contentSaga() {
    yield all([fork(takeEvery, FETCH_POSTS, getPosts)]);
    yield all([fork(takeEvery, FETCH_TOPICS, getTopics)]);
    yield all([fork(takeEvery, FETCH_TAGS, getTags)]);
    yield all([fork(takeEvery, FETCH_POST, getPost)]);
    yield all([fork(takeEvery, FETCH_RELATABLES, getRelatables)]);
    yield all([fork(takeEvery, FETCH_COMMENTS, getComments)]);
    yield all([fork(takeEvery, CREATE_COMMENT, createComment)]);
    yield all([fork(takeEvery, UPDATE_COMMENT, updateComment)]);
    yield all([fork(takeEvery, DELETE_COMMENT, deleteComment)]);
    yield all([fork(takeEvery, LIKE_COMMENT, likeComment)]);
}
