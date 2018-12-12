import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchPonyfill from 'fetch-ponyfill';
import { dropRight, take } from 'lodash';
import { 
    fetchedPosts,
    fetchedTopics,
    fetchedTags 
} from './actions';

import { 
    FETCH_POSTS,
    FETCH_PAGE_POSTS,
    FILTER_POSTS,
    FETCHED_POSTS,
    FETCH_TOPICS,
    FETCHED_TOPICS,
    FETCH_TAGS,
    FETCHED_TAGS,
    FETCH_POST,
    FETCHED_POST,
    FETCH_COMMENTS,
    FETCHED_COMMENTS
} from './constants';

const { fetch } = fetchPonyfill(Promise);

/**
 * Fetch data from service. In most case, you don't need put api services function to another file
 * @param  {[type]} per_page 
 * @return {[type]}          
 */
function fetchPosts(per_page: integer ) {
    return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit='+per_page, {}).then((resp) => {
        return resp.json ? resp.json() : resp;
    });
}

function fetchTopics(per_page: integer ) {
    return {
        topics: [{'title': 'News'}, {'title': 'Design'}, {'title': 'Hiring'}, {'title': 'Offers'}],
        meta: {}
    }
}

function fetchTags(per_page: integer ) {
    return {
        tags: [{'title': 'record'}, {'title': 'progress'}, {'title': 'freebies'}, {'title': 'offers'}],
        meta: {}
    }
}
/**
 * @param {string} options.name    
 * @param {string} options.per_page 
 */
function* getPosts({ name, page, per_page, filter, sort }) {

    try {
        const data = yield call(fetchPosts, per_page);
        const posts = data.posts.reduce((acc, curr) => {
            const content = '';
            acc.push({
                title: dropRight(take(curr.title, 30).join('').split(' ')).join(' '),
                link: curr.slug
            });
            return acc;

        }, []);

        yield put(fetchedPosts(name, posts));
    } catch (err) {}
}

function* getTopics({ name, page, per_page, filter, sort }) {
    try {
        const data = yield call(fetchTopics, per_page);
        const topics = data.topics.reduce((acc, curr) => {
            acc.push({
                title: curr.title
            });
            return acc;
        }, []);

        yield put(fetchedTopics(name, topics));
    } catch (err) {}
}

function* getTags({ name, page, per_page, filter, sort }) {
    try {
        const data = yield call(fetchTags, per_page);
        const tags = data.tags.reduce((acc, curr) => {
            acc.push({
                title: curr.title
            });
            return acc;
        }, []);

        yield put(fetchedTags(name, tags));
    } catch (err) {}
}

export function* postsSaga() {
    yield all([fork(takeEvery, FETCH_POSTS, getPosts)]);
    yield all([fork(takeEvery, FETCH_TOPICS, getTopics)]);
    yield all([fork(takeEvery, FETCH_TAGS, getTags)]);
}

