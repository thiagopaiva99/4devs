import { InvalidFieldError } from '@/validations/errors'
import { FieldValidation } from '@/validations/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
