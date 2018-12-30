import React from 'react';
import invariant from 'invariant';
import {
    isEmpty, isFunction, isString, conformsTo, isObject,
} from 'lodash';
import reducers from './reducers';

export const RESTART_ON_REMOUNT = '@@reactive/restart-on-remount';
export const ONCE_TILL_UNMOUNT = '@@reactive/once-till-unmount';
export const DAEMON = '@@reactive/daemon';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key => invariant(isString(key) && !isEmpty(key), '(app/utils...) injectSaga: Expected `key` to be a non empty string');

const checkDescriptor = (descriptor) => {
    const shape = {
        saga: isFunction,
        mode: mode => isString(mode) && allowedModes.includes(mode),
    };
    invariant(conformsTo(descriptor, shape), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

function checkStore(store) {
    const shape = {
        dispatch: isFunction,
        subscribe: isFunction,
        getState: isFunction,
        replaceReducer: isFunction,
        broker: isFunction,
        loadedReducers: isObject,
        loadedSagas: isObject,
    };

    invariant(conformsTo(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}

function loadHeader(store, isValid) {
    return function design(header) {
        store.design = store.design.update('header', () => header);
    };
}

function loadFooter(store, isValid) {
    return function design(footer) {
        store.design = store.design.update('footer', () => footer);
    };
}

function loadLeftside(store, isValid) {
    return function design(leftside) {
        store.design = store.design.update('leftside', () => leftside);
    };
}

function loadRightside(store, isValid) {
    return function design(rightside) {
        store.design = store.design.update('rightside', () => rightside);
    };
}

function loadModal(store, isValid) {
    return function injectReducer(key, modal) {
        if (!isValid) checkStore(store);
        invariant(isString(key) && !isEmpty(key), '(app/utils...) withModal: modal should be react component');
        store.modal = store.modal.set(key, () => modal);
    };
}


function loadDrawer(store, isValid) {
    return function injectReducer(key, drawer) {
        if (!isValid) checkStore(store);
        invariant(isString(key) && !isEmpty(key), '(app/utils...) withDrawer: drawer should be react component');
        store.drawer = store.drawer.set(key, () => drawer);
    };
}

function loadReducer(store, isValid) {
    return function injectReducer(key, reducer) {
        if (!isValid) checkStore(store);

        invariant(isString(key) && !isEmpty(key) && isFunction(reducer),
            '(app/utils...) injectReducer: Expected `reducer` to be a reducer function');

        if (Reflect.has(store.loadedReducers, key) && store.loadedReducers[key] === reducer) return;

        store.loadedReducers[key] = reducer;

        store.replaceReducer(reducers(store.loadedReducers));
    };
}

function loadSaga(store, isValid) {
    return function injectSaga(key, descriptor = {}, args) {
        if (!isValid) checkStore(store);
        const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
        const { saga, mode } = newDescriptor;
        checkKey(key);
        checkDescriptor(newDescriptor);
        let hasSaga = Reflect.has(store.loadedSagas, key);
        if (process.env.NODE_ENV !== 'production') {
            const oldDescriptor = store.loadedSagas[key];
            if (hasSaga && oldDescriptor.saga !== saga) {
                oldDescriptor.task.cancel();
                hasSaga = false;
            }
        }

        if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
            store.loadedSagas[key] = { ...newDescriptor, task: store.broker(saga, args) };
        }
    };
}

export function trimSaga(store, isValid) {
    return function ejectSaga(key) {
        if (!isValid) checkStore(store);
        checkKey(key);
        if (Reflect.has(store.loadedSagas, key)) {
            const descriptor = store.loadedSagas[key];
            if (descriptor.mode !== DAEMON) {
                descriptor.task.cancel();
                if (process.env.NODE_ENV === 'production') {
                    store.loadedSagas[key] = 'done';
                }
            }
        }
    };
}


export default function getComposers(store) {
    checkStore(store);
    return {
        loadReducer: loadReducer(store, true),
        loadHeader: loadHeader(store, true),
        loadFooter: loadFooter(store, true),
        loadLeftside: loadLeftside(store, true),
        loadRightside: loadRightside(store, true),
        loadDrawer: loadDrawer(store, true),
        loadModal: loadModal(store, true),
        loadSaga: loadSaga(store, true),
        trimSaga: trimSaga(store, true),
    };
}
