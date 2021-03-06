import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validations/test'

import { database, random } from 'faker'

type ValidationFactoryTypes = {
  validation: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const validationFactory = (fieldName: string): ValidationFactoryTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const validation = ValidationComposite.build(fieldValidationsSpy)

  return {
    validation,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = database.column()
    const { validation, fieldValidationsSpy } = validationFactory(fieldName)
    const errorMessage = random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(random.words())
    const error = validation.validate(fieldName, { [fieldName]: random.word() })
    expect(error).toBe(errorMessage)
  })

  test('should return falsy if none validation fails', () => {
    const fieldName = database.column()
    const { validation } = validationFactory(fieldName)
    const error = validation.validate(fieldName, { [fieldName]: random.word() })
    expect(error).toBeFalsy()
  })
})
