import { fromJS, List, Map } from 'immutable';

import {
    FETCH_POSTS,
    FILTER_POSTS,
    FETCHED_POSTS,
    FETCH_TOPICS,
    FETCHED_TOPICS,
    FETCH_TAGS,
    FETCHED_TAGS,
    FETCH_POST,
    FETCHED_POST,
    FETCH_RELATABLES,
    FETCHED_RELATABLES,
    FETCH_COMMENTS,
    FETCHED_COMMENTS,
    CREATE_COMMENT,
    COMMENT_CREATED,
    UPDATE_COMMENT,
    COMMENT_UPDATED,
    DELETE_COMMENT,
    COMMENT_DELETED,
    REPLAY_COMMENT,
    COMMENT_REPLIED,
    LIKE_COMMENT,
    COMMENT_LIKED,
} from './constants';

const paginate = {
    request: Map({
        fetching: false, page: 1, perpage: 2, order: 'asc', filter: List(),
    }),
    response: Map({ ids: List(), count: 0, pages: 1 }),
    cache: List(),
};

const postCollection = fromJS(Object.assign(paginate, {
    posts: List(),
}));

export const postAggregateReducer = (position = '') => {
    return function posts(state = postCollection, action) {
        if (action.position !== position) {
            return state;
        }

        const page = action.page ? action.page : 1;
        const sort = action.sort ? action.sort : 'asc';
        const per_page = action.per_page ? action.per_page : 10;
        const filter = action.filter ? action.filter : {};
        const response = Object.assign({
            ids: [], pages: 1, count: 0,
        }, action.response ? action.response : {});

        switch (action.type) {
        case FETCH_POSTS:
            return state.updateIn(['request', 'fetching'], () => true)
                .update('response', () => state.response);
        case FILTER_POSTS:
            return state.updateIn(['request', 'fetching'], () => true)
                .updateIn(['request', 'filter'], () => Map(filter))
                .update('response', () => state.response)
                .update('cache', () => state.cache);
        case FETCHED_POSTS:
            return state.update('posts', () => List(action.posts))
                .updateIn(['request', 'fetching'], () => false)
                .update('response', response => Map(response))
                .update('cache', cache => cache.set(page, List(action.posts)));
        default:
            return state;
        }
    };
};

const topicCollection = fromJS(Object.assign(paginate, {
    topics: List(),
}));

export const topicAggregateReducer = (position = '') => {
    return function topics(state = topicCollection, action) {
        if (action.position !== position) {
            return state;
        }

        const page = action.page ? action.page : 1;
        const sort = action.sort ? action.sort : 'asc';
        const per_page = action.per_page ? action.per_page : 10;
        const filter = action.filter ? action.filter : {};
        const response = Object.assign({
            ids: [], pages: 1, count: 0,
        }, action.response ? action.response : {});

        switch (action.type) {
        case FETCH_TOPICS:
            return state.updateIn(['request', 'fetching'], () => true)
                .update('response', () => state.response);
        case FETCHED_TOPICS:
            return state.update('topics', () => List(action.topics))
                .updateIn(['request', 'fetching'], () => false)
                .update('response', response => Map(response))
                .update('cache', cache => cache.set(page, List(action.topics)));
        default:
            return state;
        }
    };
};

const tagCollection = fromJS(Object.assign(paginate, {
    tags: List(),
}));

export const tagAggregateReducer = (position = '') => {
    return function tags(state = tagCollection, action) {
        if (action.position !== position) {
            return state;
        }

        const page = action.page ? action.page : 1;
        const sort = action.sort ? action.sort : 'asc';
        const per_page = action.per_page ? action.per_page : 10;
        const filter = action.filter ? action.filter : {};
        const response = Object.assign({
            ids: [], pages: 1, count: 0,
        }, action.response ? action.response : {});

        switch (action.type) {
        case FETCH_TAGS:
            return state.updateIn(['request', 'fetching'], () => true)
                .update('response', () => state.response);
        case FETCHED_TAGS:
            return state.update('tags', () => List(action.tags))
                .updateIn(['request', 'fetching'], () => false)
                .update('response', response => Map(response))
                .update('cache', cache => cache.set(page, List(action.tags)));
        default:
            return state;
        }
    };
};

const postQuery = fromJS({
    post: Map(),
    comment: Map(Object.assign(paginate, {
        comments: List(),
    })),
    relatable: Map(Object.assign(paginate, {
        posts: List(),
    })),
});

export const postQueryReducer = (state = postQuery, action) => {
    switch (action.type) {
    case FETCH_POST:
        return state;
    case FETCHED_POST:
        return state.update('post', () => Map(action.post));
    case FETCH_COMMENTS:
        return state;
    case FETCHED_COMMENTS:
        return state.updateIn(['comment', 'comments'], () => List(action.comments));
    case FETCH_RELATABLES:
        return state;
    case FETCHED_RELATABLES:
        return state.updateIn(['relatable', 'posts'], () => List(action.posts));
    default:
        return state;
    }
};
const postCommand = fromJS({
    comment: Map({
        created: List(),
        updated: List(),
        deleted: List(),
        liked: List(),
    }),
});

export const postCommandReducer = (state = postCommand, action) => {
    switch (action.type) {
    case CREATE_COMMENT:
        return state.updateIn(['comment', 'created'], (node) => {
            return node.set(action.comment.id, null);
        });
    case COMMENT_CREATED:
        return state.updateIn(['comment', 'created'], (node) => {
            return node.set(action.comment.id, action.comment);
        });
    case UPDATE_COMMENT:
        return state.updateIn(['comment', 'updated'], (node) => {
            return node.set(action.comment.id, null);
        });
    case COMMENT_UPDATED:
        return state.updateIn(['comment', 'updated'], (node) => {
            return node.set(action.comment.id, action.comment);
        });
    case DELETE_COMMENT:
        return state.updateIn(['comment', 'deleted'], (node) => {
            return node.set(action.id, false);
        });
    case COMMENT_DELETED:
        return state.updateIn(['comment', 'deleted'], (node) => {
            return node.set(action.id, true);
        });
    case LIKE_COMMENT:
        return state.updateIn(['comment', 'liked'], (node) => {
            return node.set(action.id, false);
        });
    case COMMENT_LIKED:
        return state.updateIn(['comment', 'liked'], (node) => {
            return node.set(action.id, true);
        });
    default:
        return state;
    }
};
