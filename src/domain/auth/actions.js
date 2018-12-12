import {
    FETCH_POSTS,
    FETCHED_POSTS
} from './constants';

export function fetchPosts(name, args) {
    return {
        type: FETCH_POSTS,
        name: name,
        ...args,
    };
}

export function fetchedPosts(name, posts) {
    return {
        type: FETCHED_POSTS,
        name: name,
        posts,
    };
}
