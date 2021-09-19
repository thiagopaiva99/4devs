import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Signup } from './signup'
import { internet } from 'faker'

type LoginComponentFactoryTypes = {
  component: RenderResult
}

const loginComponentFactory = (): LoginComponentFactoryTypes => {
  const component = render(<Signup />)

  return {
    component
  }
}

const populateEmailField = (component: RenderResult, email = internet.email()): void => {
  const emailInput = component.getByTestId('email-field')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (component: RenderResult, password = internet.password()): void => {
  const passwordField = component.getByTestId('password-field')
  fireEvent.input(passwordField, { target: { value: password } })
}

const testStatusForField = (component: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = component.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testChildCount = (component: RenderResult, element: string, count: number): void => {
  const elementWrapper = component.getByTestId(element)
  expect(elementWrapper.childElementCount).toBe(count)
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

const validSubmitFactory = async (component: RenderResult, email = internet.email(), password = internet.password()): Promise<void> => {
  populateEmailField(component, email)
  populatePasswordField(component, password)
  const form = component.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { component } = loginComponentFactory()
    testChildCount(component, 'error-wrapper', 0)
    testButtonIsDisabled(component, 'submit', true)
    testStatusForField(component, 'name', validationError)
    testStatusForField(component, 'email', validationError)
    testStatusForField(component, 'password', validationError)
    testStatusForField(component, 'passwordConfirmation', validationError)
  })
})
