import React from 'react';
import Reactive from 'app/reactive';
import { BroswerRender, ServerRender, StaticRender } from 'app/render';
import { routes, popups, drawers } from './routes';

const broswer = (dom_id, context, props) => {
  return BroswerRender(dom_id, context, props, routes, popups, drawers)
};

const server = (context, props) => {
  return BroswerRender(context, props, routes, popups, drawers)
};

const staticer = (context, props) => {
  return BroswerRender(context, props, routes, popups, drawers)
};

Reactive.server(server);
Reactive.static(staticer);
Reactive.broswer(broswer);