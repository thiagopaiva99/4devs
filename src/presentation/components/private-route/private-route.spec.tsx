import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type PrivateRouteFactoryTypes = {
  history: MemoryHistory
}

const privateRouteFactory = (account = mockAccountModel()): PrivateRouteFactoryTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
      <ApiContext.Provider value={{ setCurrentAccount: () => {}, getCurrentAccount: () => account }}>
    <Router history={history}>
            <PrivateRoute />

        </Router>
    </ApiContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = privateRouteFactory(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if token is not empty', () => {
    const { history } = privateRouteFactory()
    expect(history.location.pathname).toBe('/')
  })
})
