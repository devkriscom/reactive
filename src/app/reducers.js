import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHANGE_LOCALE, MODAL_OPEN, MODAL_CLOSE, DRAWER_OPEN, DRAWER_CLOSE } from './constants';
import { getLocale, setLocale } from './utils';

const routeInitialState = fromJS({
    location: null,
}); 

function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
    case LOCATION_CHANGE:
        return state.merge({
            location: action.payload,
        });
    default:
        return state;
    }
} 

const configState = fromJS({});

function configReducer(state = configState, action) {
    return state;
}

const i18nState = fromJS({
    locale: getLocale(),
    locales: []
});

function i18nReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
        setLocale(action.locale);
        return state.set('locale', action.locale);
        default:
        return state;
    }
}

const popupState = fromJS({
 
});

function popupReducer(state = popupState, action) {
    switch (action.type) {
        case MODAL_OPEN:
        return state.set('opened', action.modal);
        case MODAL_CLOSE:
        return state.set('closed', action.modal);
        default:
        return state;
    }
}

const drawerState = fromJS({
 
});

function drawerReducer(state = drawerState, action) {
    switch (action.type) {
        case DRAWER_OPEN:
        return state.set('opened', action.drawer);
        case DRAWER_CLOSE:
        return state.set('closed', action.drawer);
        default:
        return state;
    }
}

const menuState = fromJS({});

function menuReducer(state = menuState, action) {
    return state;
}

export default function reducers(injectedReducers) {
    return combineReducers({
        router: routeReducer,
        config: configReducer,
        popup: popupReducer,
        drawer: drawerReducer,
        i18n: i18nReducer,
        menu: menuReducer,
        ...injectedReducers,
    });
}
