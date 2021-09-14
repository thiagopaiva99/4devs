import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import faker from 'faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import { Login } from './login'
import { AuthenticationSpy, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
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

const populateEmailField = (component: RenderResult, email = faker.internet.email()): void => {
  const emailInput = component.getByTestId('email-field')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (component: RenderResult, password = faker.internet.password()): void => {
  const passwordField = component.getByTestId('password-field')
  fireEvent.input(passwordField, { target: { value: password } })
}

const testStatusForField = (component: RenderResult, fieldName: string, validationError?: string): void => {
  const field = component.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo!')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapperChildCount = (component: RenderResult, count: number): void => {
  const errorWrapper = component.getByTestId('error-wrapper')
  expect(errorWrapper.childElementCount).toBe(count)
}

const testElementExists = (component: RenderResult, fieldName: string): void => {
  const element = component.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (component: RenderResult, fieldName: string, text: string): void => {
  const element = component.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (component: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = component.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const validSubmitFactory = async (component: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(component, email)
  populatePasswordField(component, password)
  const form = component.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { component } = loginComponentFactory({ validationError })
    testErrorWrapperChildCount(component, 0)
    testButtonIsDisabled(component, 'submit', true)
    testStatusForField(component, 'email', validationError)
    testStatusForField(component, 'password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { component } = loginComponentFactory({ validationError })
    populateEmailField(component)
    testStatusForField(component, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { component } = loginComponentFactory({ validationError })
    populatePasswordField(component)
    testStatusForField(component, 'password', validationError)
  })

  test('should show valid email state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    populateEmailField(component)
    testStatusForField(component, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    populatePasswordField(component)
    testStatusForField(component, 'email')
  })

  test('should enable submit button if form is valid', () => {
    const { component } = loginComponentFactory()
    populateEmailField(component)
    populatePasswordField(component)
    testButtonIsDisabled(component, 'submit', false)
  })

  test('should show spinner on submit', async () => {
    const { component } = loginComponentFactory()
    await validSubmitFactory(component)
    testElementExists(component, 'spinner')
  })

  test('should call authentication with correct values', async () => {
    const { component, authenticationSpy } = loginComponentFactory()
    const email = faker.internet.email()
    const password = faker.internet.password()
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
    const validationError = faker.random.words()
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
    testErrorWrapperChildCount(component, 1)
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
    testErrorWrapperChildCount(component, 1)
  })

  test('should go to signup page', () => {
    const { component } = loginComponentFactory()
    const signup = component.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
