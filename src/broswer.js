import React from 'react';
import Loadable from 'react-loadable';
import { BroswerRender } from 'app/render';
import { routes } from './routes';
import './styles/app.scss';

const render = (dom_id, context, props) => {
    return BroswerRender(dom_id, context, props, routes);
};

Loadable.preloadReady().then(() => render());
