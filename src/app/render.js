import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { addLocaleData } from 'react-intl';
import { reduce } from 'lodash';
import storeFactory from './storeFactory';
import { locales } from './configs/i18n.json';
import AppProvider from './provider';

const i18nList = reduce(locales, (result, locale) => {
    const obj = result;

    const { code } = locale;

    let data = {};

    try {
        data = require(`./locales/${code}.json`);
    } catch (e) {}

    obj[code] = data;

    try {
        // const localeData = require(`react-intl/locale-data/${code}`);
        // addLocaleData(localeData);
    } catch (error) {
        console.warn(`Upsss "${code}" is not supported by "react-intl" module.`);
    }

    return obj;
}, {});

export const BroswerRender = (dom_id, context, props, router, translations) => {
    const store = storeFactory(context, props);

    const domId = dom_id || 'react-view';

    ReactDOM.hydrate(
      <Provider store={store}>
        <AppProvider messages={i18nList}>
          <BrowserRouter {...context}>
            {router(store)}
        </BrowserRouter>
    </AppProvider>
    </Provider>,
    document.getElementById(domId),
    );
};

export const ServerRender = (context, props, router, translations) => {
    const store = storeFactory(context, props, true);
    return renderToString(
      <Provider store={store}>
          <AppProvider messages={i18nList}>
              <StaticRouter {...context}>
                {router(store)}
            </StaticRouter>
        </AppProvider>
        </Provider>,
        );
};

export const StaticRender = (context, props, router, translations) => {
    const store = storeFactory(context, props, true);
    return renderToString(
      <Provider store={store}>
          <AppProvider messages={i18nList}>
            <StaticRouter {...context}>
              {router(store)}
          </StaticRouter>
      </AppProvider>
      </Provider>,
      );
};
