import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { internet, random } from 'faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import { Login } from './login'
import { AuthenticationSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type LoginComponentFactoryTypes = {
  component: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
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
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const authenticationSpy = new AuthenticationSpy()

  const component = render(
        <Router history={history}>
            <Login
              validation={validationStub}
              authentication={authenticationSpy}
              saveAccessToken={saveAccessTokenMock}
            />
        </Router>
  )

  return {
    component,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const testElementExists = (component: RenderResult, fieldName: string): void => {
  const element = component.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (component: RenderResult, fieldName: string, text: string): void => {
  const element = component.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const validSubmitFactory = async (component: RenderResult, email = internet.email(), password = internet.password()): Promise<void> => {
  Helper.populateField(component, 'email', email)
  Helper.populateField(component, 'password', password)
  const form = component.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.testChildCount(component, 'error-wrapper', 0)
    Helper.testElementDisabledState(component, 'submit', true)
    Helper.testStatusForField(component, 'email', validationError)
    Helper.testStatusForField(component, 'password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'email', internet.email())
    Helper.testStatusForField(component, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'password', internet.password())
    Helper.testStatusForField(component, 'password', validationError)
  })

  test('should show valid email state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'email', internet.email())
    Helper.testStatusForField(component, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'password', internet.password())
    Helper.testStatusForField(component, 'email')
  })

  test('should enable submit button if form is valid', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'email', internet.email())
    Helper.populateField(component, 'password', internet.password())
    Helper.testElementDisabledState(component, 'submit', false)
  })

  test('should show spinner on submit', async () => {
    const { component } = loginComponentFactory()
    await validSubmitFactory(component)
    testElementExists(component, 'spinner')
  })

  test('should call authentication with correct values', async () => {
    const { component, authenticationSpy } = loginComponentFactory()
    const email = internet.email()
    const password = internet.password()
    await validSubmitFactory(component, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call authentication only once', async () => {
    const { component, authenticationSpy } = loginComponentFactory()
    await validSubmitFactory(component)
    await validSubmitFactory(component)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call authentication if form is invalid', async () => {
    const validationError = random.words()
    const { component, authenticationSpy } = loginComponentFactory({ validationError })
    await validSubmitFactory(component)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if authentication fails', async () => {
    const { component, authenticationSpy } = loginComponentFactory()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await validSubmitFactory(component)
    testElementText(component, 'main-error', error.message)
    Helper.testChildCount(component, 'error-wrapper', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { component, authenticationSpy, saveAccessTokenMock } = loginComponentFactory()
    await validSubmitFactory(component)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { component, saveAccessTokenMock } = loginComponentFactory()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await validSubmitFactory(component)
    testElementText(component, 'main-error', error.message)
    Helper.testChildCount(component, 'error-wrapper', 1)
  })

  test('should go to signup page', () => {
    const { component } = loginComponentFactory()
    const signup = component.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
