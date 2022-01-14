import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { loginFactory, signupFactory } from '../factories/pages'

const Router: React.FC = () => (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter
    }} >
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={loginFactory} />
                <Route path="/signup" exact component={signupFactory} />
                <Route path="/" exact component={SurveyList} />
            </Switch>
        </BrowserRouter>
    </ApiContext.Provider>
)

export default Router
