import { EmailValidation } from './email.validation'
import { InvalidFieldError } from '@/validations/errors'

import { database, internet, random } from 'faker'

const validationFactory = (fieldName: string): EmailValidation => new EmailValidation(fieldName)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const fieldName = database.column()
    const validator = validationFactory(fieldName)
    const error = validator.validate({ [fieldName]: random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const fieldName = database.column()
    const validator = validationFactory(fieldName)
    const error = validator.validate({ [fieldName]: internet.email() })
    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty string', () => {
    const fieldName = database.column()
    const validator = validationFactory(fieldName)
    const error = validator.validate({ [fieldName]: '' })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const validation = validationFactory(database.column())
    const error = validation.validate({ [database.column()]: internet.email() })
    expect(error).toBeFalsy()
  })
})
