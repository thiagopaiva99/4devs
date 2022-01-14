import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { loginFactory, signupFactory } from '../factories/pages'

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={loginFactory} />
            <Route path="/signup" exact component={signupFactory} />
            <Route path="/" exact component={SurveyList} />
        </Switch>
    </BrowserRouter>
)

export default Router
