import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'

type PrivateRouteFactoryTypes = {
  history: MemoryHistory
}

const privateRouteFactory = (): PrivateRouteFactoryTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
<Router history={history}>
        <PrivateRoute />

    </Router>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = privateRouteFactory()
    expect(history.location.pathname).toBe('/login')
  })
})
