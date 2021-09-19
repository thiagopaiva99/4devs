import { RenderResult } from '@testing-library/react'

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
