import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from "react-router-dom";

import path from 'path';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import Helmet from 'react-helmet';
import renderServer from '../reactjs/server';

const app = express();

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

app.use(express.static(path.resolve(process.cwd(), 'public')));

app.get('*', (req, res) => {

    const history = historyFactory();

    const store = storeFactory(history);

    const loadBranchData = (): Promise<any> => {

        const branch = matchRoutes(routes, req.path);

        const promises = branch.map(({ route, match }) => {
            if (route.loadData) {
                return Promise.all(route.loadData({ params: match.params, getState: store.getState }).map(item => store.dispatch(item)));
            }
            return Promise.resolve(null);
        });

        return Promise.all(promises);
    };

    (async () => {
        try {
            await loadBranchData();

            const staticContext = {};

            const initialState = store.getState();

            res.status(status).send(renderServer(staticContext, initialState));

        } catch (err) {
            res.status(404).send('Not Found :(');
            console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
        }

    })();
});
