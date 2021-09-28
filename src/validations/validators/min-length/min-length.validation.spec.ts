import { InvalidFieldError } from '@/validations/errors'
import { MinLengthValidation } from './min-length.validation'

import { database, datatype, random } from 'faker'

const validationFactory = (fieldName: string, minLength: number): MinLengthValidation => new MinLengthValidation(fieldName, minLength)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const fieldName = database.column()
    const minLength = datatype.number()
    const validator = validationFactory(fieldName, minLength)
    const error = validator.validate({ [fieldName]: random.alphaNumeric(minLength - 1) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const fieldName = database.column()
    const minLength = datatype.number()
    const validator = validationFactory(fieldName, minLength)
    const error = validator.validate({ [fieldName]: random.alphaNumeric(minLength + 1) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const validation = validationFactory(database.column(), 3)
    const error = validation.validate({ [database.column()]: random.word() })
    expect(error).toBeFalsy()
  })
})
