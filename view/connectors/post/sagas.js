import {
    all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import fetchPonyfill from 'fetch-ponyfill';
import { fetchedPosts } from './actions';
import { FETCH_POSTS } from './constants';
import { makeSelectBody } from './selectors';

const {
    fetch, Request, Response, Headers,
} = fetchPonyfill;

function* getPosts() {
    try {
        const data = yield call(fetchPosts);
        const posts = data.posts.reduce((acc, curr) => {
            const content = '';

            acc.push({
                title: curr.title,
                link: curr.slug,
                content: `${content} [...]`,
            });

            return acc;
        }, []);

        yield put(fetchedPosts(posts));
    } catch (err) {
    // Silent
    }
}


function fetchPosts() {
    return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit=2', {})
        .then((resp) => {
            return resp.json ? resp.json() : resp;
        });
}


function* defaultSaga() {
    yield all([
        fork(takeLatest, FETCH_POSTS, getPosts),
    ]);
}

export default defaultSaga;
