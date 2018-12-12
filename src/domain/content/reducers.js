import { fromJS, List, Map } from 'immutable';
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

const postsState = fromJS({
    posts: List(),
    meta: {
        pagination: Map({
            limit: null,
            next: 1,
            page: 1,
            pages: 1,
            prev: null,
            count: 0
        }),
        filter: List(),
        order: 'asc'
    },
    loading: false,
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
            return state.update('loading', () => true);
            case FETCH_PAGE_POSTS:
            return state.update('loading', () => true);
            case FILTER_POSTS:
            return state.update('loading', () => true);
            case FETCHED_POSTS:
            return state.update('posts', () => List(action.posts)).update('loading', () => false);
            default:
            return state;
        }
    }
}

const topicsState = fromJS({
    topics: List(),
    filter: Map({
        page: 1,
        filters: List(),
        sort: 'asc'
    }),
    loading: false,
    ids: List()
});

export const createTopicsReducer = (section = '') => {
    return function topics(state = topicsState, action) {
        const { name } = action
        if (name !== section) {
            return state
        }
        switch (action.type) {
            case FETCH_TOPICS:
            return state.update('loading', () => true);
            case FETCHED_TOPICS:
            return state.update('topics', () => List(action.topics)).update('loading', () => false);
            default:
            return state;
        }
    }
}

const tagsState = fromJS({
    tags: List(),
    filter: Map({
        page: 1,
        filters: List(),
        sort: 'asc'
    }),
    loading: false,
    ids: List()
});

export const createTagsReducer = (section = '') => {
    return function tags(state = tagsState, action) {
        const { name } = action
        if (name !== section) {
            return state
        }
        switch (action.type) {
            case FETCH_TAGS:
            return state.update('loading', () => true);
            case FETCHED_TAGS:
            return state.update('tags', () => List(action.tags)).update('loading', () => false);
            default:
            return state;
        }
    }
}

const postState = fromJS({
    post: Map(),
    comments: List(),
    loading: false
});

export const createPostReducer = (section = '') => {
    return function post(state = postState, action) {
        const { name } = action
        if (name !== section) {
            return state
        }
        switch (action.type) {
            case FETCH_POST:
            return state.update('loading', () => true);
            case FETCHED_POST:
            return state.update('post', () => action.post).update('loading', () => false);
            case FETCH_COMMENTS:
            return state.update('loading', () => true);
            case FETCHED_COMMENTS:
            return state.update('comments', () => List(action.comments)).update('loading', () => false);
            default:
            return state;
        }
    }
}
