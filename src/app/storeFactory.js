import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS, Map, List } from 'immutable';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import createSagaMiddleware from 'redux-saga';
import merge from 'merge';
import reducers from './reducers';
import configs from './configs/config.json';
import menus from './configs/menus.json';
import i18n from './configs/i18n.json';
import {
    Header, Footer, Leftside, Rightside,
} from './component';

const data = (props: object) => {
    return merge({
        config: configs,
        menu: menus,
        i18n,
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
    store.broker = sagaMiddleware.run;
    store.design = Map({
        header: <Header />,
        footer: <Footer />,
        leftside: <Leftside />,
        rightside: <Rightside />,
    });

    store.modal = Map({});

    store.drawer = Map({});

    store.loadedReducers = {};

    store.loadedSagas = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducers(store.loadedReducers));
        });
    }

    return store;
}
