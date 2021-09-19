import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Signup } from './signup'
import { internet } from 'faker'
import { Helper } from '@/presentation/test'

type LoginComponentFactoryTypes = {
  component: RenderResult
}

const loginComponentFactory = (): LoginComponentFactoryTypes => {
  const component = render(<Signup />)

  return {
    component
  }
}

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { component } = loginComponentFactory()
    Helper.testChildCount(component, 'error-wrapper', 0)
    Helper.testElementDisabledState(component, 'submit', true)
    Helper.testStatusForField(component, 'name', validationError)
    Helper.testStatusForField(component, 'email', validationError)
    Helper.testStatusForField(component, 'password', validationError)
    Helper.testStatusForField(component, 'passwordConfirmation', validationError)
  })
})
