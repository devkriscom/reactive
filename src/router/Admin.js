import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Admin from 'containers/Admin/Admin';
import Dashboard from 'pages/Admin/Dashboard';

export const routes = (store) => {
    return (<Admin>
      <Switch>
          <Route
                exact
          path=""
          component={Dashboard}
        />
        </Switch>
    </Admin>

    );
};

export default routes;
