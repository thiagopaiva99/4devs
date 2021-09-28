import { RequiredFieldValidation, ValidationBuilder, MinLengthValidation, EmailValidation, CompareFieldsValidation } from '@/validations/validators'

import { datatype, database } from 'faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const field = database.column()
    const length = datatype.number()
    const validations = ValidationBuilder.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('should return CompareFieldsValidation', () => {
    const field = database.column()
    const fieldToCompare = database.column()
    const validations = ValidationBuilder.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('should return EmailValidation', () => {
    const field = database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('should return more than one validation', () => {
    const field = database.column()
    const length = datatype.number()
    const validations = ValidationBuilder.field(field).email().required().min(length).build()
    expect(validations).toEqual([
      new EmailValidation(field),
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length)
    ])
  })
})
