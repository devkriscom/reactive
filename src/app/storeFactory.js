import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import createSagaMiddleware from 'redux-saga';
import merge from 'merge';
import reducers from './reducers';
import configs from './configs/config.json';
import menus from './configs/menus.json';
import i18n from './configs/i18n.json';

const data = (props: object) => {
    return merge({
        config: configs,
        menu: menus,
        i18n: i18n
    }, props);
};

export function hasBasename(path, prefix) {
    return new RegExp(`^${prefix}(\\/|\\?|#|$)`, 'i').test(path);
}

function stripBasename(path, prefix) {
    return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

export const historyFactory = (context, makeStatic) => {
    makeStatic = typeof makeStatic !== 'undefined';
    if (process.env.BROWSER && makeStatic === false) {
        return createBrowserHistory(context);
    }
    let pather = context.location;
    if (context.basename) pather = stripBasename(pather, context.basename);
    context.initialEntries = [pather];
    return createMemoryHistory(context);
};

export default function storeFactory(context, initialStates, makeStatic) {

    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = composeWithDevTools({
        ...applyMiddleware(),
    });

    const preloadState = {
        router: context,
        ...data(initialStates),
    };

    const store = createStore(reducers(), fromJS(preloadState), compose(applyMiddleware(sagaMiddleware), composeEnhancers));

    store.sagaBroker = sagaMiddleware.run;

    store.loadedReducers = {};

    store.loadedSagas = {};

    store.modals = {};

    store.drawers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducers(store.loadedReducers));
        });
    }

    return store;
}
