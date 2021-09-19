import React from 'react'
import { render, RenderResult, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { Signup } from './signup'
import { internet, random } from 'faker'
import { Helper, ValidationStub } from '@/presentation/test'

type LoginComponentFactoryTypes = {
  component: RenderResult
}

type FactoryParams = {
  validationError: string
}

const loginComponentFactory = (params?: FactoryParams): LoginComponentFactoryTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const component = render(
    <Signup
      validation={validationStub}
    />
  )

  return {
    component
  }
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
})
