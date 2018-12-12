import { createSelector } from 'reselect';


const selectHomePageDomain = () => state => state.get('homePage');

const makeSelectHomePage = () => createSelector(
    selectHomePageDomain(),
    substate => substate.toJS(),
);

const makeSelectBody = () => createSelector(
    selectHomePageDomain(),
    substate => substate.get('body').toJS(),
);


export default makeSelectHomePage;
export {
    makeSelectBody,
    selectHomePageDomain,
};
