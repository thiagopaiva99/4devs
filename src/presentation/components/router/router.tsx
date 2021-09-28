import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  loginFactory: React.FC
  signupFactory: React.FC
}

const Router: React.FC<Factory> = ({ loginFactory, signupFactory }: Factory) => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={loginFactory} />
            <Route path="/signup" exact component={signupFactory} />
        </Switch>
    </BrowserRouter>
)

export default Router
