import { InvalidFieldError } from '@/validations/errors'

import { database, random } from 'faker'
import { CompareFieldsValidation } from './compare-fields.validation'

const validationFactory = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const validation = validationFactory(random.word())
    const error = validation.validate(random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const word = random.word()
    const validation = validationFactory(word)
    const error = validation.validate(word)
    expect(error).toBeFalsy()
  })
})
