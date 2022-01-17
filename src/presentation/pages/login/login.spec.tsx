import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { internet, random } from 'faker'
import { fireEvent, render, RenderResult, waitFor, screen } from '@testing-library/react'

import { ApiContext } from '@/presentation/contexts'
import { Login } from './login'
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type LoginComponentFactoryTypes = {
  component: RenderResult
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type FactoryParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/login']
})

const loginComponentFactory = (params?: FactoryParams): LoginComponentFactoryTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const setCurrentAccountMock = jest.fn()

  const component = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
          />
      </Router>
    </ApiContext.Provider>
  )

  return {
    component,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const validSubmitFactory = async (email = internet.email(), password = internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    expect(screen.getByTestId('error-wrapper').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('email', internet.email())
    Helper.testStatusForField('email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('password', internet.password())
    Helper.testStatusForField('password', validationError)
  })

  test('should show valid email state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('email', internet.email())
    Helper.testStatusForField('email')
  })

  test('should show valid password state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('password', internet.password())
    Helper.testStatusForField('email')
  })

  test('should enable submit button if form is valid', () => {
    loginComponentFactory()
    Helper.populateField('email', internet.email())
    Helper.populateField('password', internet.password())
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    loginComponentFactory()
    await validSubmitFactory()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call authentication with correct values', async () => {
    const { authenticationSpy } = loginComponentFactory()
    const email = internet.email()
    const password = internet.password()
    await validSubmitFactory(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call authentication only once', async () => {
    const { authenticationSpy } = loginComponentFactory()
    await validSubmitFactory()
    await validSubmitFactory()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call authentication if form is invalid', async () => {
    const validationError = random.words()
    const { authenticationSpy } = loginComponentFactory({ validationError })
    await validSubmitFactory()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if authentication fails', async () => {
    const { authenticationSpy } = loginComponentFactory()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await validSubmitFactory()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = loginComponentFactory()
    await validSubmitFactory()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', () => {
    loginComponentFactory()
    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
