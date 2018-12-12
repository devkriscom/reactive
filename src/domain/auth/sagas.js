import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchPonyfill from 'fetch-ponyfill';
import { fetchedPosts } from './actions';
import { FETCH_POSTS } from './constants';

const { fetch } = fetchPonyfill(Promise);

function fetchPosts(per_page) {
    return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit='+per_page, {

    }).then((resp) => {
        return resp.json ? resp.json() : resp;
    });
}


function* getPosts(args) {
    
    try {

        const { name, per_page } = args;

        const data = yield call(fetchPosts, per_page);

        const posts = data.posts.reduce((acc, curr) => {
            const content = '';
            acc.push({
                title: curr.title,
                link: curr.slug,
                content: `${content} [...]`,
            });

            return acc;
        }, []);

        yield put(fetchedPosts(name, posts));
    } catch (err) {}
}

export function* postsSaga() {
    yield all([fork(takeEvery, FETCH_POSTS, getPosts)]);
}

