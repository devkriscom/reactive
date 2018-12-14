import { createSelector } from 'reselect';

const postCollection = state => state.get('blogPosts');

export const selectPosts = createSelector(
    [postCollection],
    (collection) => {
        console.log(collection);
    	return collection.get('posts').toJS()
    }
);

const getPopular = state => state.get('blogPopulars');
export const selectPopulars = createSelector(
    [getPopular],
    (main) => {
    	return main.get('posts').toJS()
    }
);

const getTopic = state => state.get('blogTopics');
export const selectTopics = createSelector(
    [getTopic],
    (topic) => {
    	return topic.get('topics').toJS()
    }
);

const getTag = state => state.get('blogTags');
export const selectTags = createSelector(
    [getTag],
    (tag) => {
    	return tag.get('tags').toJS()
    }
);