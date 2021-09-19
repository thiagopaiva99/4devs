import { RenderResult, fireEvent } from '@testing-library/react'
import { random } from 'faker'

export const testChildCount = (component: RenderResult, element: string, count: number): void => {
  const elementWrapper = component.getByTestId(element)
  expect(elementWrapper.childElementCount).toBe(count)
}

export const testStatusForField = (component: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = component.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testElementDisabledState = (component: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = component.getByTestId(fieldName) as HTMLInputElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (component: RenderResult, fieldName: string, value = random.word()): void => {
  const inputField = component.getByTestId(`${fieldName}-field`)
  fireEvent.input(inputField, { target: { value } })
}

export const testElementExists = (component: RenderResult, fieldName: string): void => {
  const element = component.getByTestId(fieldName)
  expect(element).toBeTruthy()
}
