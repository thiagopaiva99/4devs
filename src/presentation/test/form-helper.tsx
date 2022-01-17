import { fireEvent, screen } from '@testing-library/react'
import { random } from 'faker'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus).toHaveAttribute('title', validationError || 'Tudo certo!')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

export const populateField = (fieldName: string, value = random.word()): void => {
  const inputField = screen.getByTestId(`${fieldName}-field`)
  fireEvent.input(inputField, { target: { value } })
}
