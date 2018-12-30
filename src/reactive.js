import React from 'react';
import Reactive from 'app/reactive';
import { BroswerRender, ServerRender, StaticRender } from 'app/render';
import { routes } from './routes';

const broswer = (dom_id, context, props) => {
    return BroswerRender(dom_id, context, props, routes);
};

const server = (context, props) => {
    return BroswerRender(context, props, routes);
};

const staticer = (context, props) => {
    return BroswerRender(context, props, routes);
};

Reactive.server(server);
Reactive.static(staticer);
Reactive.broswer(broswer);
