import { fromJS, List, Map } from 'immutable';
import _ from 'lodash';

import {
    FETCH_POSTS,
    FETCHED_POSTS,
    FETCH_POST,
    FETCHED_POST,
    CREATE_POST,
    POST_CREATED,
    DELETE_POST,
    POST_DELETED,
    FETCH_COMMENTS,
    FETCHED_COMMENTS,
    CREATE_COMMENT,
    COMMENT_CREATED,
    DELETE_COMMENT,
    COMMENT_DELETED,
} from './constants';

// posts
const postsState = fromJS({
    posts: List(),
    loading: false,
});

export function posts(state = postsState, action) {
    switch (action.type) {
    case FETCH_POSTS:
        return state.update('loading', true);
    case FETCHED_POSTS:
        return state.update('posts', () => List(action.posts));
    default:
        return state;
    }
}

const postState = fromJS({
    post: Map(),
    loading: false,
});

export function post(state = postState, action) {
    switch (action.type) {
    case FETCH_POST:
        return state.update('loading', true);
    case FETCHED_POST:
        return state.update('posts', () => List(action.posts));
    default:
        return state;
    }
}
