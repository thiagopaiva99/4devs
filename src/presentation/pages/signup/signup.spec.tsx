import React from 'react'
import { render, RenderResult, fireEvent, waitFor, cleanup, screen } from '@testing-library/react'
import { Signup } from './signup'
import { internet, random, name as nameFaker } from 'faker'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

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
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
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

const validSubmitFactory = async (name = nameFaker.findName(), email = internet.email(), password = internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.testChildCount('error-wrapper', 0)
    Helper.testElementDisabledState('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('should show password confirmation error if validation fails', () => {
    const validationError = random.words()
    loginComponentFactory({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('should show valid name state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('should show valid email state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('email', internet.email())
    Helper.testStatusForField('email')
  })

  test('should show valid password state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('password', internet.password())
    Helper.testStatusForField('password')
  })

  test('should show valid password confirmation state if validation succeeds', () => {
    loginComponentFactory()
    Helper.populateField('passwordConfirmation', internet.password())
    Helper.testStatusForField('passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    loginComponentFactory()
    const password = internet.password()
    Helper.populateField('name', nameFaker.findName())
    Helper.populateField('email', internet.email())
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)
    Helper.testElementDisabledState('submit', false)
  })

  test('should show spinner on submit', async () => {
    loginComponentFactory()
    await validSubmitFactory()
    Helper.testElementExists('spinner')
  })

  test('should call addAccount with correct values', async () => {
    const { addAccountSpy } = loginComponentFactory()
    const name = nameFaker.findName()
    const email = internet.email()
    const password = internet.password()
    await validSubmitFactory(name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('should call authentication only once', async () => {
    const { addAccountSpy } = loginComponentFactory()
    await validSubmitFactory()
    await validSubmitFactory()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call authentication if form is invalid', async () => {
    const validationError = random.words()
    const { addAccountSpy } = loginComponentFactory({ validationError })
    await validSubmitFactory()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if add account fails', async () => {
    const { addAccountSpy } = loginComponentFactory()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await validSubmitFactory()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('error-wrapper', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = loginComponentFactory()
    await validSubmitFactory()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page', () => {
    loginComponentFactory()
    const login = screen.getByTestId('login')
    fireEvent.click(login)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
