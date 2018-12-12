import React from 'react';
import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import conformsTo from 'lodash/conformsTo';
import isObject from 'lodash/isObject';
import reducers from './reducers';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

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
        sagaBroker: isFunction,
        loadedReducers: isObject,
        loadedSagas: isObject,
    };
    invariant(conformsTo(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}

function loadModal(store, isValid) {
    return function injectReducer(key, modal) {
        if (!isValid) checkStore(store);
        invariant(isString(key) && !isEmpty(key) && !React.isValidElement(modal), '(app/utils...) withModal: modal should be react component');
        if (Reflect.has(store.modals, key) && store.modals[key] === modal) return;
        store.modals[key] = modal;
    };
}

function trimModal(store, isValid) {
    return function deleteModal(key) {
        if (!isValid) {
            checkStore(store);
        }
        checkKey(key);
        //do nothing for now.
    };
}

function loadDrawer(store, isValid) {
    return function injectReducer(key, drawer) {
        if (!isValid) checkStore(store);
        invariant(isString(key) && !isEmpty(key) && !React.isValidElement(drawer), '(app/utils...) withDrawer: drawer should be react component');
        if (Reflect.has(store.drawers, key) && store.drawers[key] === drawer) return;
        store.drawers[key] = drawer;
    };
}

function trimDrawer(store, isValid) {
    return function deleteDrawer(key) {
        if (!isValid) {
            checkStore(store);
        }
        checkKey(key);
        //do nothing for now.
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
            store.loadedSagas[key] = { ...newDescriptor, task: store.sagaBroker(saga, args) };
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
        loadSaga: loadSaga(store, true),
        trimSaga: trimSaga(store, true),
        loadModal: loadModal(store, true),
        trimModal: trimModal(store, true),
        loadDrawer: loadDrawer(store, true),
        trimModal: trimDrawer(store, true)
    };
}
