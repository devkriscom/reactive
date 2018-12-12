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

export function fetcPosts(args) {
    return {
        type: FETCH_POSTS,
        ...args,
    };
}

export function fetchedPosts(posts) {
    return {
        type: FETCHED_POSTS,
        posts,
    };
}

export function fetcPost(id) {
    return {
        type: FETCH_POST,
        id,
    };
}

export function fetchedPost(post) {
    return {
        type: FETCHED_POST,
        post,
    };
}

export function createPost(post) {
    return {
        type: CREATE_POST,
        post,
    };
}

export function postCreated(post) {
    return {
        type: POST_CREATED,
        post,
    };
}

export function deleetePost(id) {
    return {
        type: DELETE_POST,
        id,
    };
}

export function postDeleted(id) {
    return {
        type: POST_DELETED,
        id,
    };
}

export function fetcComments(post_id, args) {
    return {
        type: FETCH_COMMENTS,
        post_id,
        args,
    };
}

export function fetchedComments(comments) {
    return {
        type: FETCHED_COMMENTS,
        comments,
    };
}

export function createComment(comment) {
    return {
        type: CREATE_COMMENT,
        comment,
    };
}

export function commendCreated(comment) {
    return {
        type: COMMENT_CREATED,
        comment,
    };
}

export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id,
    };
}

export function commentDeleted(id) {
    return {
        type: COMMENT_DELETED,
        id,
    };
}
