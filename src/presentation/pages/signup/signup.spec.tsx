import React from 'react'
import { render, RenderResult, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { Signup } from './signup'
import { internet, random, name as nameFaker } from 'faker'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import { EmailInUseError, InvalidCredentialsError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type LoginComponentFactoryTypes = {
  component: RenderResult
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type FactoryParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/signup']
})

const loginComponentFactory = (params?: FactoryParams): LoginComponentFactoryTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const component = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Signup
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    component,
    addAccountSpy,
    setCurrentAccountMock
  }
}

const validSubmitFactory = async (component: RenderResult, name = nameFaker.findName(), email = internet.email(), password = internet.password()): Promise<void> => {
  Helper.populateField(component, 'name', name)
  Helper.populateField(component, 'email', email)
  Helper.populateField(component, 'password', password)
  Helper.populateField(component, 'passwordConfirmation', password)
  const form = component.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.testChildCount(component, 'error-wrapper', 0)
    Helper.testElementDisabledState(component, 'submit', true)
    Helper.testStatusForField(component, 'name', validationError)
    Helper.testStatusForField(component, 'email', validationError)
    Helper.testStatusForField(component, 'password', validationError)
    Helper.testStatusForField(component, 'passwordConfirmation', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'name')
    Helper.testStatusForField(component, 'name', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'email')
    Helper.testStatusForField(component, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'password')
    Helper.testStatusForField(component, 'password', validationError)
  })

  test('should show password confirmation error if validation fails', () => {
    const validationError = random.words()
    const { component } = loginComponentFactory({ validationError })
    Helper.populateField(component, 'passwordConfirmation')
    Helper.testStatusForField(component, 'passwordConfirmation', validationError)
  })

  test('should show valid name state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'name')
    Helper.testStatusForField(component, 'name')
  })

  test('should show valid email state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'email', internet.email())
    Helper.testStatusForField(component, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'password', internet.password())
    Helper.testStatusForField(component, 'password')
  })

  test('should show valid password confirmation state if validation succeeds', () => {
    const { component } = loginComponentFactory()
    Helper.populateField(component, 'passwordConfirmation', internet.password())
    Helper.testStatusForField(component, 'passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    const { component } = loginComponentFactory()
    const password = internet.password()
    Helper.populateField(component, 'name', nameFaker.findName())
    Helper.populateField(component, 'email', internet.email())
    Helper.populateField(component, 'password', password)
    Helper.populateField(component, 'passwordConfirmation', password)
    Helper.testElementDisabledState(component, 'submit', false)
  })

  test('should show spinner on submit', async () => {
    const { component } = loginComponentFactory()
    await validSubmitFactory(component)
    Helper.testElementExists(component, 'spinner')
  })

  test('should call addAccount with correct values', async () => {
    const { component, addAccountSpy } = loginComponentFactory()
    const name = nameFaker.findName()
    const email = internet.email()
    const password = internet.password()
    await validSubmitFactory(component, name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('should call authentication only once', async () => {
    const { component, addAccountSpy } = loginComponentFactory()
    await validSubmitFactory(component)
    await validSubmitFactory(component)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call authentication if form is invalid', async () => {
    const validationError = random.words()
    const { component, addAccountSpy } = loginComponentFactory({ validationError })
    await validSubmitFactory(component)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if add account fails', async () => {
    const { component, addAccountSpy } = loginComponentFactory()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await validSubmitFactory(component)
    Helper.testElementText(component, 'main-error', error.message)
    Helper.testChildCount(component, 'error-wrapper', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { component, addAccountSpy, setCurrentAccountMock } = loginComponentFactory()
    await validSubmitFactory(component)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page', () => {
    const { component } = loginComponentFactory()
    const login = component.getByTestId('login')
    fireEvent.click(login)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
