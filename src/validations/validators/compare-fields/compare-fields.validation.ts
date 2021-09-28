import { InvalidFieldError } from '@/validations/errors'
import { FieldValidation } from '@/validations/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompare: string) {}

  validate (input: object): Error {
    return !input[this.field] || !input[this.fieldToCompare] || input[this.field] === input[this.fieldToCompare] ? null : new InvalidFieldError()
  }
}
