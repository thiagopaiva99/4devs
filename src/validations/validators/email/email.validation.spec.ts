import { EmailValidation } from './email.validation'
import { InvalidFieldError } from '@/validations/errors'

import faker from 'faker'

const validationFactory = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const validator = validationFactory()
    const error = validator.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const validator = validationFactory()
    const error = validator.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty string', () => {
    const validator = validationFactory()
    const error = validator.validate('')
    expect(error).toBeFalsy()
  })
})
