import { Login } from '@/presentation/pages/login/login';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Props = {
    makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact={true} component={makeLogin} />
        </Switch>
    </BrowserRouter>
);

export default Router;