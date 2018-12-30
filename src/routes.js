import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Page404 from 'pages/Error/404';
import Page500 from 'pages/Error/500';
import FrontApp from './router/Front';

export const routes = (store) => {
	return (<Switch>
		<Route path="/" component={FrontApp} />
		<Route path="*" component={Page404} status={404} />
		<Route path="*" component={Page500} status={500} />
		</Switch>);
};

export default routes;
