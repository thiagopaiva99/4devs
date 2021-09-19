import { Signup } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  loginFactory: React.FC
}

const Router: React.FC<Props> = ({ loginFactory }: Props) => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={loginFactory} />
            <Route path="/signup" exact component={Signup} />
        </Switch>
    </BrowserRouter>
)

export default Router
