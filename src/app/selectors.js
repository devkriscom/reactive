import { createSelector } from 'reselect';


export const getConfig = (state) => {
    return state.get('config');
};

export const getDrawer = (state) => {
    return state.get('drawer');
};

export const getNextDrawer = createSelector(
    [getDrawer],
    (drawer) => {
        return drawer.get('opened');
    },
);

export const getLastDrawer = createSelector(
    [getDrawer],
    (drawer) => {
        return drawer.get('closed');
    },
);

export const getModal = (state) => {
    return state.get('popup');
};

export const getNextModal = createSelector(
    [getModal],
    (modal) => {
        return modal.get('opened');
    },
);

export const getLastModal = createSelector(
    [getModal],
    (modal) => {
        return modal.get('closed');
    },
);

export const getI18n = (state) => {
    return state.get('i18n');
};

export const getLocales = createSelector(
    [getI18n],
    (i18n) => {
        if (i18n.get('locales')) {
            return i18n.get('locales').toJS();
        }
    },
);

export const getLocale = createSelector(
    [getI18n],
    (i18n) => {
        return i18n.get('locale');
    },
);

export const getMenus = (state) => {
    return state.get('menu');
};

export const getMenuProps = (state, props) => {
    return props.name;
};

export const getMenu = createSelector(
    [getMenus, getMenuProps],
    (menus, menu) => {
    	if (menus.get(menu)) {
            const items = menus.get(menu);
            return items.toJS();
        }
        return [];
    },
);

export const getMenuByName = (name) => {
    return createSelector(getMenus, (menus) => {
        if (menus.get(name)) {
            return menus.get(name).toJS();
        }
    });
};
