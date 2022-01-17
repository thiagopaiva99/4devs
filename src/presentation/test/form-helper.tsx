import { RenderResult, fireEvent, screen } from '@testing-library/react'
import { random } from 'faker'

export const testChildCount = (element: string, count: number): void => {
  const elementWrapper = screen.getByTestId(element)
  expect(elementWrapper.childElementCount).toBe(count)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testElementDisabledState = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLInputElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (fieldName: string, value = random.word()): void => {
  const inputField = screen.getByTestId(`${fieldName}-field`)
  fireEvent.input(inputField, { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
