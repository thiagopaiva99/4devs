import { Login } from '@/presentation/pages/login/login';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '@/presentation/styles/globals.scss';

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact={true} component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Router;