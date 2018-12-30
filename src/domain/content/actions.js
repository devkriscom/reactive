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

export function fetchPosts(position, args) {
    return { type: FETCH_POSTS, position, ...args };
}

export function fetchPagePosts(position, args) {
    return { type: FETCH_PAGE_POSTS, position, ...args };
}

export function filterPosts(position, args) {
    return { type: FILTER_POSTS, position, ...args };
}

export function fetchedPosts(position, posts, response) {
    return {
        type: FETCHED_POSTS, position, posts, response,
    };
}

export function fetchTopics(position, args) {
    return { type: FETCH_TOPICS, position, ...args };
}

export function fetchedTopics(position, topics, response) {
    return {
        type: FETCHED_TOPICS, position, topics, response,
    };
}

export function fetchTags(position, args) {
    return { type: FETCH_TAGS, position, ...args };
}

export function fetchedTags(position, tags, response) {
    return {
        type: FETCHED_TAGS, position, tags, response,
    };
}

export function fetchPost(args) {
    return { type: FETCH_POST, ...args };
}

export function fetchedPost(post, response) {
    return { type: FETCHED_POST, post, response };
}

export function fetchRelatables(args) {
    return { type: FETCH_RELATABLES, ...args };
}

export function fetchedRelatables(posts, response) {
    return { type: FETCHED_RELATABLES, posts, response };
}

export function fetchComments(args) {
    return { type: FETCH_COMMENTS, ...args };
}

export function fetchedComments(comments, response) {
    return { type: FETCHED_COMMENTS, comments, response };
}

export function createComment(comment) {
    return { type: CREATE_COMMENT, comment };
}

export function commentCreated(comment, response) {
    return { type: COMMENT_CREATED, comment, response };
}

export function updateComment(comment) {
    return { type: UPDATE_COMMENT, comment };
}

export function commentUpdated(comment, response) {
    return { type: COMMENT_UPDATED, comment, response };
}

export function deleteComment(comment) {
    return { type: DELETE_COMMENT, id: comment };
}

export function commentDeleted(comment, response) {
    return { type: COMMENT_DELETED, id: comment, response };
}

export function likeComment(comment) {
    return { type: LIKE_COMMENT, id: comment };
}

export function commentLiked(comment, response) {
    return { type: COMMENT_LIKED, id: comment, response };
}
