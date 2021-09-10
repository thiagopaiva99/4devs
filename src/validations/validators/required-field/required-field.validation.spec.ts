import { RequiredFieldError } from '@/validations/errors'
import { RequiredFieldValidation } from './required-field.validation'

import faker from 'faker'

const validationFactory = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const validation = validationFactory()
    const error = validation.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const validation = validationFactory()
    const error = validation.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
