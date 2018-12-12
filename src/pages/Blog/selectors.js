import { createSelector } from 'reselect';

const getMain = state => state.get('blog_posts');
export const selectPosts = createSelector(
    [getMain],
    (main) => {
    	return main.get('posts').toJS()
    }
);

const getPopular = state => state.get('blog_populars');
export const selectPopulars = createSelector(
    [getPopular],
    (main) => {
    	return main.get('posts').toJS()
    }
);

const getTopic = state => state.get('blog_topics');
export const selectTopics = createSelector(
    [getTopic],
    (topic) => {
    	return topic.get('topics').toJS()
    }
);

const getTag = state => state.get('blog_tags');
export const selectTags = createSelector(
    [getTag],
    (tag) => {
    	return tag.get('tags').toJS()
    }
);