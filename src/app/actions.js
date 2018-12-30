import {
    CHANGE_LOCALE, MODAL_OPEN, MODAL_CLOSE, DRAWER_OPEN, DRAWER_CLOSE,
} from './constants';

export function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        locale,
    };
}

export function openModal(modal) {
    return {
        type: MODAL_OPEN,
        modal,
    };
}

export function closeModal(modal) {
    return {
        type: MODAL_CLOSE,
        modal,
    };
}

export function openDrawer(drawer) {
    return {
        type: DRAWER_OPEN,
        drawer,
    };
}

export function closeDrawer(drawer) {
    return {
        type: DRAWER_CLOSE,
        drawer,
    };
}
