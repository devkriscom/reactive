import { createSelector } from 'reselect';

const postQuery = state => state.get('postQuery');

export const selectPost = createSelector(
    [postQuery],
    (query) => {
    	return query.get('post').toJS()
    }
);

export const selectComments = createSelector(
    [postQuery],
    (query) => {
    	return query.getIn(['comment', 'comments']).toJS()
    }
);

export const requestComments = createSelector(
    [postQuery],
    (query) => {
        return query.getIn(['comment', 'request']).toJS()
    }
);

export const selectRelatables = createSelector(
    [postQuery],
    (query) => {
        return query.getIn(['relatable', 'posts']).toJS()
    }
);

export const requestRelatables = createSelector(
    [postQuery],
    (query) => {
        return query.getIn(['relatable', 'request']).toJS()
    }
);