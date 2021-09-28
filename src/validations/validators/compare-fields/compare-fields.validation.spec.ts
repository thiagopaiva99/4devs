import { InvalidFieldError } from '@/validations/errors'

import { database, random } from 'faker'
import { CompareFieldsValidation } from './compare-fields.validation'

const validationFactory = (fieldName: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(fieldName, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldName = database.column()
    const fieldToCompare = database.column()
    const validation = validationFactory(fieldName, fieldToCompare)
    const error = validation.validate({
      [fieldName]: random.word(),
      [fieldToCompare]: random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const fieldName = database.column()
    const fieldToCompare = database.column()
    const word = random.word()
    const validation = validationFactory(fieldName, fieldToCompare)
    const error = validation.validate({
      [fieldName]: word,
      [fieldToCompare]: word
    })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const validation = validationFactory(database.column(), database.column())
    const error = validation.validate({
      [database.column()]: random.word(),
      [database.column()]: random.word()
    })
    expect(error).toBeFalsy()
  })
})
