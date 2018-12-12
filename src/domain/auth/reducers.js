import { fromJS, List, Map } from 'immutable';

import {
    FETCH_POSTS,
    FETCHED_POSTS
} from './constants';

const postsState = fromJS({
    posts: List(),
    filter: Map({
        filters: List(),
        sort: 'asc'
    }),
    fetching: false,
    nextUrl: undefined,
    count: 0,
    ids: List()
});

export const createPostsReducer = (section = '') => {

    return function posts(state = postsState, action) {
        const { name } = action
        if (name !== section) {
            return state
        }
        switch (action.type) {
            case FETCH_POSTS:
            return state.set('loading', true);
            case FETCHED_POSTS:
            return state.update('posts', () => List(action.posts));
            default:
            return state;
        }
    }

}