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

export function fetchPosts(name, args) {
    return { type: FETCH_POSTS, name: name, ...args };
}

export function fetchPagePosts(name, args) {
    return { type: FETCH_PAGE_POSTS, name: name, ...args };
}

export function filterPosts(name, args) {
    return { type: FILTER_POSTS, name: name, ...args };
}

export function fetchedPosts(name, posts) {
    return { type: FETCHED_POSTS, name: name, posts };
}

export function fetchTopics(name, args) {
    return { type: FETCH_TOPICS, name: name, ...args };
}

export function fetchedTopics(name, topics) {
    return { type: FETCHED_TOPICS, name: name, topics };
}

export function fetchTags(name, args) {
    return { type: FETCH_TAGS, name: name, ...args };
}

export function fetchedTags(name, tags) {
    return { type: FETCHED_TAGS, name: name, tags };
}
export function fetchPost(name, args) {
    return { type: FETCH_POST, name: name, ...args };
}

export function fetchedPost(name, post) {
    return { type: FETCHED_POST, name: name, post };
}

export function fetchComments(name, args) {
    return { type: FETCH_COMMENTS, name: name, ...args };
}

export function fetchedComments(name, comments) {
    return { type: FETCHED_COMMENTS, name: name, comments };
}