import { RequiredFieldError } from '@/validations/errors'
import { RequiredFieldValidation } from './required-field.validation'

import { database, random } from 'faker'

const validationFactory = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const fieldName = database.column()
    const validation = validationFactory(fieldName)
    const error = validation.validate({ [fieldName]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const fieldName = database.column()
    const validation = validationFactory(fieldName)
    const error = validation.validate({ [fieldName]: random.word() })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const validation = validationFactory(database.column())
    const error = validation.validate({ [database.column()]: random.word() })
    expect(error).toBeFalsy()
  })
})
